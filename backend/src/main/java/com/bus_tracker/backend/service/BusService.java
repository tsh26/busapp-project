package com.bus_tracker.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BusService {

    @Value("${api.key}")
    private String apiKey;

    public String getBusArrival(String busStopCode) {
        // Define the URL for the third-party API
        String url = String.format("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=%s", busStopCode);

        // Create a RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();

        // Set the headers with the API key
        HttpHeaders headers = new HttpHeaders();
        headers.set("AccountKey", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the API call and get the response
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        // Return the response body
        return response.getBody();
    }

    public String getBusStops() {

        String url = String.format("http://datamall2.mytransport.sg/ltaodataservice/BusStops");

        // Create a RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();

        // Set the headers with the API key
        HttpHeaders headers = new HttpHeaders();
        headers.set("AccountKey", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the API call and get the response
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        // Return the response body
        return response.getBody();
    }
}
