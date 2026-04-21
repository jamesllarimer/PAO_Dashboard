package mil.army.moda.pao_dashboard.posting_location;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posting_locations")
public class PostingLocationsController {
    private final PostingLocationService postingLocationService;
    public PostingLocationsController(PostingLocationService postingLocationService) {
        this.postingLocationService = postingLocationService;
    }
    @GetMapping
    public List<PostingLocation> getPostingLocations() {
        return postingLocationService.getPostingLocations();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostingLocation createPostingLocation(@RequestBody PostingLocation postingLocation) {
        return postingLocationService.createPostingLocation(postingLocation);
    }
}
