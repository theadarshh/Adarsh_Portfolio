package com.adarshportfolio.scheduler;

import com.adarshportfolio.service.GitHubService;
import com.adarshportfolio.service.LeetCodeService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DailyStatsScheduler {

    private static final Logger log = LoggerFactory.getLogger(DailyStatsScheduler.class);

    private final LeetCodeService leetCodeService;
    private final GitHubService   gitHubService;

    /** 11:59 PM IST = 18:29 UTC */
    @Scheduled(cron = "0 29 18 * * *", zone = "UTC")
    public void refreshLeetCode() {
        log.info("[Scheduler] Refreshing LeetCode stats...");
        try { leetCodeService.refresh(); log.info("[Scheduler] LeetCode refresh OK"); }
        catch (Exception e) { log.error("[Scheduler] LeetCode refresh FAILED: {}", e.getMessage()); }
    }

    /** Midnight IST = 18:30 UTC */
    @Scheduled(cron = "0 30 18 * * *", zone = "UTC")
    public void refreshGitHub() {
        log.info("[Scheduler] Refreshing GitHub stats...");
        try { gitHubService.refresh(); log.info("[Scheduler] GitHub refresh OK"); }
        catch (Exception e) { log.error("[Scheduler] GitHub refresh FAILED: {}", e.getMessage()); }
    }

    /** On startup: fetch once after 30 s */
    @Scheduled(initialDelay = 30_000, fixedDelay = Long.MAX_VALUE)
    public void initialLoad() {
        log.info("[Startup] Initial stats fetch...");
        try { leetCodeService.refresh(); gitHubService.refresh(); log.info("[Startup] Initial fetch complete"); }
        catch (Exception e) { log.error("[Startup] Initial fetch failed: {}", e.getMessage()); }
    }
}
