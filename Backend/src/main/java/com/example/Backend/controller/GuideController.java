package com.example.Backend.controller;

import java.util.*;

import com.example.Backend.repository.GuideRepository;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Guide;
import com.example.Backend.service.GuideService;

@RestController
@RequestMapping("/api/auth/guide")
public class GuideController {

    @Autowired
    private GuideService guideService;

    @Autowired
    private GuideRepository grepo;

    @GetMapping
    public List<Guide> getAllGuides() {
        return guideService.getAllGuides();
    }

    @GetMapping("/{id}")
    public Guide getGuideById(@PathVariable String id) {
        return guideService.getGuideById(id);
    }

    @PostMapping("/addGuide")
    public Guide saveGuide(@RequestBody Guide guide) {
        return guideService.saveGuide(guide);
    }

    @DeleteMapping("/{id}")
    public void deleteGuideById(@PathVariable String id) {
        guideService.deleteGuideById(id);
    }
   @GetMapping("/email/{email}")
public ResponseEntity<Map<String, Boolean>> checkGuideEmail(@PathVariable String email) {
    boolean exists = guideService.existsByEmail(email);
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", exists);
    return ResponseEntity.ok(response);
}
@GetMapping("/guideEmail/{email}")
public List<Guide> getGuideByEmail(@PathVariable String email){
 return guideService.getGuidesByEmail(email);
}

    @GetMapping("/getidbymail/{gmail}")
    public ResponseEntity<?> giveid(@PathVariable("gmail") String gm)
    {
        Optional<Guide> g = grepo.findByEmail(gm);

        if(g.isPresent())
        {
            return ResponseEntity.ok(g.get().getId());
        }

        return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("Guide not found");
    }

    @GetMapping("/getmailfromid/{gid}")
    public ResponseEntity<?> getmail(@PathVariable("gid") String gId)
    {
        Optional<Guide> guide = grepo.findById(gId);
        
        if(!guide.isPresent()) {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("Guide not found");
        }

        return ResponseEntity.ok(guide.get().getEmail());
    }
}
