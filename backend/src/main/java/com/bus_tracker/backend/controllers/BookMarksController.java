package com.bus_tracker.backend.controllers;

import com.bus_tracker.backend.models.BookMark;
import com.bus_tracker.backend.service.BookMarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bookmarks")
public class BookMarksController {

    @Autowired
    private BookMarksService bookMarksService;

    // Create a new bookmark
    @PostMapping
    public ResponseEntity<BookMark> createBookmark(@RequestBody BookMark bookmark) {
        BookMark createdBookmark = bookMarksService.createBookmark(bookmark);
        return ResponseEntity.ok(createdBookmark);
    }

    // Get a bookmark by its ID
    @GetMapping("/{id}")
    public ResponseEntity<BookMark> getBookmarkById(@PathVariable String id) {
        BookMark bookmark = bookMarksService.getBookmarkById(id);
        return ResponseEntity.ok(bookmark);
    }

    // Update a bookmark
    @PutMapping("/{id}")
    public ResponseEntity<BookMark> updateBookmark(@PathVariable String id, @RequestBody BookMark updatedBookmark) {
        BookMark bookmark = bookMarksService.updateBookmark(id, updatedBookmark);
        return ResponseEntity.ok(bookmark);
    }

    // Delete a bookmark
    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable String userId, @PathVariable String id) throws Exception {
        bookMarksService.deleteBookmark(userId, id);
        return ResponseEntity.noContent().build();
    }

    // Get bookmarks for a specific user by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookMark>> getBookmarksByUserId(@PathVariable String userId) {
        List<BookMark> userBookmarks = bookMarksService.getBookmarksByUserId(userId);
        return ResponseEntity.ok(userBookmarks);
    }
}
