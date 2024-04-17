package com.bus_tracker.backend.service;
import com.bus_tracker.backend.models.BookMark;
import com.bus_tracker.backend.repository.BookMarksRedisRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BookMarksService {

    @Autowired
    private BookMarksRedisRepository bookMarksRedisRepository;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

//    public BookMark createBookmark(BookMark bookmark) {
//        return bookMarksRedisRepository.save(bookmark);
//    }

    public BookMark createBookmark(BookMark bookmark) {
        // Serialize the bookmark object to JSON
        try {
            String jsonBookmark = objectMapper.writeValueAsString(bookmark);
            // Use the user ID as the Redis key and the bookmark ID as the hash field
            String userBookmarksKey = "user:" + bookmark.getUserId();
            redisTemplate.opsForHash().put(userBookmarksKey, bookmark.getId().toString(), jsonBookmark);
        } catch (IOException e) {
            throw new RuntimeException("Failed to serialize bookmark", e);
        }
        return bookmark;
    }

    public BookMark getBookmarkById(String id) {
        return bookMarksRedisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bookmark not found with id: " + id));
    }

    public BookMark updateBookmark(String id, BookMark updatedBookmark) {
        if (!bookMarksRedisRepository.existsById(id)) {
            throw new RuntimeException("Bookmark not found with id: " + id);
        }

        // Update the bookmark and save it
        updatedBookmark.setId(Long.parseLong(id));
        return bookMarksRedisRepository.save(updatedBookmark);
    }

    public void deleteBookmark(String userId, String bookmarkId) {
        // Create the Redis hash key for the user ID
        String userBookmarksKey = "user:" + userId;

        // Remove the bookmark from Redis
        redisTemplate.opsForHash().delete(userBookmarksKey, bookmarkId);
    }

    public List<BookMark> getBookmarksByUserId(String userId) {
        // Create the Redis hash key for the user ID
        String userBookmarksKey = "user:" + userId;

        // Retrieve all hash fields (bookmarks) from the key and cast the map
        Map<Object, Object> entries = redisTemplate.opsForHash().entries(userBookmarksKey);
        Map<String, String> jsonBookmarks = entries.entrySet().stream()
                .collect(Collectors.toMap(
                        e -> (String) e.getKey(),
                        e -> (String) e.getValue()
                ));

        // Deserialize JSON to BookMark objects
        List<BookMark> bookmarks = new ArrayList<>();
        for (String json : jsonBookmarks.values()) {
            try {
                BookMark bookmark = objectMapper.readValue(json, BookMark.class);
                bookmarks.add(bookmark);
            } catch (IOException e) {
                throw new RuntimeException("Failed to deserialize bookmark", e);
            }
        }
        return bookmarks;
    }

}
