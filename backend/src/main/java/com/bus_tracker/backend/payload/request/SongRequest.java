package com.bus_tracker.backend.payload.request;

import lombok.Data;

@Data
public class SongRequest {
    private String songName;
    private String artist;
    private String album;
    private String userId;

}

