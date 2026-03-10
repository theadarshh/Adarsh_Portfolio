package com.adarshportfolio.service;

import com.adarshportfolio.dto.ContactRequest;
import com.adarshportfolio.model.ContactMessage;
import com.adarshportfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repo;
    private final JavaMailSender           mailSender;

    @Value("${app.contact.notify-email}")
    private String notifyEmail;

    public void handleContact(ContactRequest req) {
        // 1. Persist to DB
        ContactMessage msg = new ContactMessage();
        msg.setName(req.getName());
        msg.setEmail(req.getEmail());
        msg.setSubject(req.getSubject());
        msg.setMessage(req.getMessage());
        repo.save(msg);

        // 2. Send notification email
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(notifyEmail);
            mail.setFrom(notifyEmail);
            mail.setReplyTo(req.getEmail());
            mail.setSubject("Portfolio Contact: " + (req.getSubject() != null ? req.getSubject() : "New Message") + " — from " + req.getName());
            mail.setText(buildBody(req));
            mailSender.send(mail);
            log.info("Contact notification email sent for {}", req.getName());
        } catch (Exception e) {
            log.error("Failed to send notification email: {}", e.getMessage());
        }

        // 3. Send auto-reply to sender
        try {
            SimpleMailMessage reply = new SimpleMailMessage();
            reply.setTo(req.getEmail());
            reply.setFrom(notifyEmail);
            reply.setSubject("Got your message, " + req.getName().split(" ")[0] + " — Adarsh R");
            reply.setText(buildAutoReply(req));
            mailSender.send(reply);
        } catch (Exception e) {
            log.warn("Auto-reply failed for {}: {}", req.getEmail(), e.getMessage());
        }
    }

    private String buildBody(ContactRequest req) {
        return """
                ──────────────────────────────────────
                New contact from your portfolio
                ──────────────────────────────────────
                Name    : %s
                Email   : %s
                Subject : %s
                ──────────────────────────────────────
                Message:
                %s
                ──────────────────────────────────────
                """.formatted(req.getName(), req.getEmail(),
                              req.getSubject() != null ? req.getSubject() : "—",
                              req.getMessage());
    }

    private String buildAutoReply(ContactRequest req) {
        return """
                Hi %s,

                Thanks for reaching out. I received your message and will get back to you within 24 hours.

                Here's what you sent:
                ──────────────────────────────
                %s
                ──────────────────────────────

                Best,
                Adarsh R
                Freelance Full Stack Developer
                adarshr3131@gmail.com
                github.com/theadarshh
                """.formatted(req.getName().split(" ")[0], req.getMessage());
    }
}
