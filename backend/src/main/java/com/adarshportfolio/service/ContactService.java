package com.adarshportfolio.service;

import com.adarshportfolio.dto.ContactRequest;
import com.adarshportfolio.model.ContactMessage;
import com.adarshportfolio.repository.ContactMessageRepository;
import com.resend.Resend;
import com.resend.services.emails.model.SendEmailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository repo;

    @Value("${resend.api.key}")
    private String apiKey;

    @Value("${app.contact.notify-email}")
    private String notifyEmail;

    public void handleContact(ContactRequest req) {

        // 1️⃣ Save message to DB
        ContactMessage msg = new ContactMessage();
        msg.setName(req.getName());
        msg.setEmail(req.getEmail());
        msg.setSubject(req.getSubject());
        msg.setMessage(req.getMessage());
        repo.save(msg);

        Resend resend = new Resend(apiKey);

        // 2️⃣ Send notification to you
        SendEmailRequest notifyRequest = SendEmailRequest.builder()
                .from("onboarding@resend.dev")
                .to(notifyEmail)
                .subject("Portfolio Contact: " + req.getSubject())
                .html(buildBody(req))
                .build();

        resend.emails().send(notifyRequest);

        // 3️⃣ Auto reply to sender
        SendEmailRequest autoReply = SendEmailRequest.builder()
                .from("onboarding@resend.dev")
                .to(req.getEmail())
                .subject("Got your message — Adarsh R")
                .html(buildAutoReply(req))
                .build();

        resend.emails().send(autoReply);
    }

    private String buildBody(ContactRequest req) {

        return """
        <h3>New Portfolio Contact</h3>

        <b>Name:</b> %s <br>
        <b>Email:</b> %s <br>
        <b>Subject:</b> %s <br>

        <p>%s</p>
        """.formatted(req.getName(), req.getEmail(),
                req.getSubject(), req.getMessage());
    }

    private String buildAutoReply(ContactRequest req) {

        return """
        <p>Hi %s,</p>

        <p>Thanks for reaching out. I received your message and will reply within 24 hours.</p>

        <p><b>Your Message:</b></p>
        <p>%s</p>

        <br>
        <p>Best Regards,<br>
        Adarsh R<br>
        Full Stack Developer</p>
        """.formatted(req.getName(), req.getMessage());
    }
}