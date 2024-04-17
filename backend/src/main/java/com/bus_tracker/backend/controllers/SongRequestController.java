package com.bus_tracker.backend.controllers;

import com.bus_tracker.backend.payload.request.SongRequest;
import com.bus_tracker.backend.service.SongRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/song-requests")
public class SongRequestController {

    @Autowired
    private SongRequestService songRequestService;

    @PostMapping
    public ResponseEntity<?> submitSongRequest(@RequestBody SongRequest request) {
        try {
            songRequestService.processSongRequest(request);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to submit song request: " + e.getMessage());
        }
    }
}
