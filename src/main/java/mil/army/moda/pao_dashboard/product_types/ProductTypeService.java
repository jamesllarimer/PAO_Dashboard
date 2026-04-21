package mil.army.moda.pao_dashboard.product_types;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;
    public ProductTypeService(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
    public List<ProductType> findAll() {
        return productTypeRepository.findAll();
    }
    public ProductType save(ProductType productType) {
        return productTypeRepository.save(productType);
    }
    public void delete(ProductType productType) {
        productTypeRepository.delete(productType);
    }
}
