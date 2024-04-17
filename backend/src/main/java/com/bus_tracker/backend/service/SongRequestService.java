package com.bus_tracker.backend.service;

import com.bus_tracker.backend.payload.request.SongRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class SongRequestService {

    @Autowired
    private JavaMailSender mailSender;

    public void processSongRequest(SongRequest request) throws MessagingException {
        // Create the email content
        String subject = "New Song Request";
        String text = "Song Name: " + request.getSongName() + "\n"
                + "Artist: " + request.getArtist() + "\n"
                + "Album: " + request.getAlbum();

        // Send the email
        sendEmail(subject, text);
    }

    private void sendEmail(String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setSubject(subject);
        helper.setText(text, true);
        helper.setTo("tasha.work26@gmail.com");

        mailSender.send(message);
    }
}
