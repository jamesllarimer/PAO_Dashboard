package mil.army.moda.pao_dashboard.posting_location;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostingLocationService {
    private PostingLocationRepository postingLocationRepository;
    public PostingLocationService(PostingLocationRepository postingLocationRepository) {
        this.postingLocationRepository = postingLocationRepository;
    }

    public List<PostingLocation> getPostingLocations() {
        return postingLocationRepository.findAll();
    }
    public PostingLocation createPostingLocation(PostingLocation postingLocation) {
        return postingLocationRepository.save(postingLocation);
    }
}
