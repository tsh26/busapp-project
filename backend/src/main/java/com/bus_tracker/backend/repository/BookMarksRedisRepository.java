package com.bus_tracker.backend.repository;

import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.bus_tracker.backend.models.BookMark;

import java.util.List;

@Repository
public interface BookMarksRedisRepository extends CrudRepository<BookMark, String> {
    List<BookMark> findAllByUserId(Long userId);
}