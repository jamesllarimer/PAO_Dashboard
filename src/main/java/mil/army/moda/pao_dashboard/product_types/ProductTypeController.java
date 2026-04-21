package mil.army.moda.pao_dashboard.product_types;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product_type")
public class ProductTypeController {
    private final ProductTypeService productTypeService;
    public ProductTypeController(ProductTypeService productTypeService) {
        this.productTypeService = productTypeService;
    }
    @GetMapping
    public List<ProductType> findAll() {
        return productTypeService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductType save(@RequestBody ProductType productType) {
        return productTypeService.save(productType);
    }
}
