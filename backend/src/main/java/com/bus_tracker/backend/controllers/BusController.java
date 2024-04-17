package com.bus_tracker.backend.controllers;

import com.bus_tracker.backend.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bus")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping("/bus-arrival")
    public ResponseEntity<String> getBusArrival(@RequestParam String busStopCode) {
        return ResponseEntity.ok(busService.getBusArrival(busStopCode));
    }

    @GetMapping("/bus-stops")
    public ResponseEntity<String> getBusStops() {
        return ResponseEntity.ok(busService.getBusStops());
    }
}
