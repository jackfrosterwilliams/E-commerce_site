import React, { useEffect, useState } from "react";
import "../index.css";

const PRODUCTS_PER_LOAD = 9;

function Products() {
    const [expandedSections, setExpandedSections] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [sidebarOptions, setSidebarOptions] = useState({
        categories: [],
        sizes: [],
        colors: [],
        collections: [],
        tags: []
    });
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [priceCap, setPriceCap] = useState(150);
    const [maxPriceLimit, setMaxPriceLimit] = useState(150);
    const sliderMax = 150;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsResponse, sidebarResponse] = await Promise.all([
                    fetch("http://localhost:3000/api/products"),
                    fetch("http://localhost:3000/api/sidebar")
                ]);

                if (!productsResponse.ok || !sidebarResponse.ok) {
                    throw new Error("Failed to load products");
                }

                const productsData = await productsResponse.json();
                const sidebarData = await sidebarResponse.json();

                setProducts(productsData);
                setSidebarOptions(sidebarData);
                if (productsData.length > 0) {
                    const highestPrice = Math.max(...productsData.map(product => product.price));
                    setMaxPriceLimit(Math.min(highestPrice, 150));
                    setPriceCap(Math.min(highestPrice, 150));
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleValue = (value, selectedValues, setSelectedValues) => {
        setSelectedValues((prev) =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
        setVisibleCount(PRODUCTS_PER_LOAD);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.category);

        const matchesSize =
            selectedSizes.length === 0 || selectedSizes.includes(product.size);

        const matchesColor =
            selectedColors.length === 0 || selectedColors.includes(product.color);

        const matchesCollection =
            selectedCollections.length === 0 || selectedCollections.includes(product.collection);

        const matchesTag =
            selectedTags.length === 0 || selectedTags.includes(product.tag);

        const matchesAvailability =
            !showAvailableOnly || product.stock > 0;

        const matchesPrice = Number(product.price) <= Number(priceCap);

        return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesCollection && matchesTag && matchesAvailability && matchesPrice;
    });

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMoreProducts = visibleCount < filteredProducts.length;

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setVisibleCount(PRODUCTS_PER_LOAD);
    };

    const handleLoadMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + PRODUCTS_PER_LOAD, filteredProducts.length));
    };

    const handlePriceChange = (value) => {
        setPriceCap(Number(value));
        setVisibleCount(PRODUCTS_PER_LOAD);
    };

    const clearAllFilters = () => {
        setSearchTerm("");
        setSelectedSizes([]);
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedCollections([]);
        setSelectedTags([]);
        setShowAvailableOnly(false);
        setPriceCap(sliderMax);
        setVisibleCount(PRODUCTS_PER_LOAD);
    };

    return (
        <div className="products_page">
            <div className="products_sidebar">
                <div className="filters">
                    {/* Size Filter */}
                    <div className="filter-section">
                        <h3 className="filter-title">Size</h3>
                        <div className="size-options">
                            {sidebarOptions.sizes.map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`size-btn ${selectedSizes.includes(size) ? "selected" : ""}`}
                                    onClick={() => toggleValue(size, selectedSizes, setSelectedSizes)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Availability Filter */}
                    <div className="filter-section">
                        <h3 className="filter-title">Availability</h3>
                        <div className="availability-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={showAvailableOnly}
                                    onChange={(e) => {
                                        setShowAvailableOnly(e.target.checked);
                                        setVisibleCount(PRODUCTS_PER_LOAD);
                                    }}
                                />
                                <span>Available only</span>
                            </label>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="filter-section expandable">
                        <div 
                            className="filter-header"
                            onClick={() => toggleSection('category')}
                        >
                            <h3 className="filter-title">Category</h3>
                            <span className="expand-icon">›</span>
                        </div>
                        {expandedSections.category && (
                            <div className="filter-content">
                                {sidebarOptions.categories.map(category => (
                                    <label key={category} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => toggleValue(category, selectedCategories, setSelectedCategories)}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Range Filter */}
                    <div className="filter-section expandable">
                        <div 
                            className="filter-header"
                            onClick={() => toggleSection('priceRange')}
                        >
                            <h3 className="filter-title">Price Range</h3>
                            <span className="expand-icon">›</span>
                        </div>
                        {expandedSections.priceRange && (
                            <div className="filter-content">
                                <input
                                    type="range"
                                    min="0"
                                    max={sliderMax}
                                    value={priceCap}
                                    className="price-slider"
                                    onChange={(e) => handlePriceChange(e.target.value)}
                                />
                                <span className="price-range-label">Up to ${priceCap}</span>
                            </div>
                        )}
                    </div>

                    {/* Collections Filter */}
                    <div className="filter-section expandable">
                        <div 
                            className="filter-header"
                            onClick={() => toggleSection('collections')}
                        >
                            <h3 className="filter-title">Collections</h3>
                            <span className="expand-icon">›</span>
                        </div>
                        {expandedSections.collections && (
                            <div className="filter-content">
                                {sidebarOptions.collections.map(collection => (
                                    <label key={collection} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedCollections.includes(collection)}
                                            onChange={() => toggleValue(collection, selectedCollections, setSelectedCollections)}
                                        />
                                        <span>{collection}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tags Filter */}
                    <div className="filter-section expandable">
                        <div 
                            className="filter-header"
                            onClick={() => toggleSection('tags')}
                        >
                            <h3 className="filter-title">Tags</h3>
                            <span className="expand-icon">›</span>
                        </div>
                        {expandedSections.tags && (
                            <div className="filter-content">
                                {sidebarOptions.tags.map(tag => (
                                    <label key={tag} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => toggleValue(tag, selectedTags, setSelectedTags)}
                                        />
                                        <span>{tag}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="products_content">
                <div className="product_searchbar">
                    <div className="product_searchbar_top">
                        <h1>Products</h1>
                        <button
                            type="button"
                            className="clear-filters-btn"
                            onClick={clearAllFilters}
                        >
                            Clear all filters
                        </button>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search for products..." 
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <hr className="product_divider"></hr>
                <div className="products_grid">
                    <div className="product_cards">
                        {loading ? (
                            <p>Loading products...</p>
                        ) : filteredProducts.length > 0 ? (
                            visibleProducts.map(product => (
                                <div className="product_card" key={product.id}>
                                    <img src={product.image_url} alt={product.name} />
                                    <p>{product.category}</p>
                                    <h3>{product.name}</h3>
                                    <p className="price">${product.price}</p>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>

                    {!loading && hasMoreProducts && (
                        <div className="load-more-container">
                            <button
                                type="button"
                                className="load-more-btn"
                                onClick={handleLoadMore}
                                aria-label="Load more products"
                            >
                                ↓
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;