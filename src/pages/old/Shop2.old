import React, { useState, useEffect } from 'react';
import '../css/Shop.css'; // Ensure you have this CSS file for styles

export function Shop() {
    const [items, setItems] = useState([]); // State for all items
    const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
    const [filter, setFilter] = useState({}); // State for filter criteria
    
    // Sample items data (Replace with real data fetching logic)
    useEffect(() => {
        const sampleItems = [
            {
                id: 1,
                name: 'Gaming Powerhouse Laptop',
                price: 2200,
                memory: '32GB',
                storage: '1TB',
                processor: 'Intel',
                processorGen: '13th Gen Intel',
                graphics: 'NVIDIA'
            },
            {
                id: 2,
                name: 'Budget Friendly Notebook',
                price: 500,
                memory: '8GB',
                storage: '256GB',
                processor: 'Intel',
                processorGen: '11th Gen Intel',
                graphics: 'Intel'
            },
            {
                id: 3,
                name: 'Professional Workstation',
                price: 1500,
                memory: '16GB',
                storage: '512GB',
                processor: 'AMD',
                processorGen: 'AMD Ryzen 7000 Series',
                graphics: 'AMD'
            },
            {
                id: 4,
                name: 'Ultra Gaming Desktop',
                price: 3000,
                memory: '32GB',
                storage: '2TB',
                processor: 'AMD',
                processorGen: 'AMD Ryzen 6000 Series',
                graphics: 'NVIDIA'
            },
            {
                id: 5,
                name: 'Portable Business Laptop',
                price: 800,
                memory: '16GB',
                storage: '1TB',
                processor: 'Intel',
                processorGen: '12th Gen Intel',
                graphics: 'Intel'
            },
            {
                id: 6,
                name: 'Entry-Level Gaming Laptop',
                price: 1000,
                memory: '8GB',
                storage: '512GB',
                processor: 'Intel',
                processorGen: '11th Gen Intel',
                graphics: 'NVIDIA'
            },
            {
                id: 7,
                name: 'High Performance Notebook',
                price: 1800,
                memory: '16GB',
                storage: '1TB',
                processor: 'Intel',
                processorGen: '13th Gen Intel',
                graphics: 'AMD'
            },
            {
                id: 8,
                name: 'Multimedia Power Laptop',
                price: 1200,
                memory: '8GB',
                storage: '256GB',
                processor: 'AMD',
                processorGen: 'AMD Ryzen 6000 Series',
                graphics: 'Intel'
            }
        ];
        
        setItems(sampleItems);
        setFilteredItems(sampleItems);
    }, []);
    
    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };
    
    // Function to check if an item meets the filter criteria
    const filterItem = (item) => {
        if (filter.price && !priceRangeMatches(filter.price, item.price)) return false;
        if (filter.memory && filter.memory !== item.memory) return false;
        if (filter.storage && !storageMatches(filter.storage, item.storage)) return false;
        if (filter.processor && filter.processor !== item.processor) return false;
        if (filter.processorGen && filter.processorGen !== item.processorGen) return false;
        if (filter.graphics && filter.graphics !== item.graphics) return false;
    
        return true;
    };
    
    // Function to check if price is within the selected range
    const priceRangeMatches = (range, price) => {
        switch (range) {
            case "2001+": return price >= 2001;
            case "1501-2000": return price >= 1501 && price <= 2000;
            // ... other ranges
            default: return true;
        }
    };
    
    // Function to check if storage matches the filter
    const storageMatches = (filterStorage, itemStorage) => {
        // Convert storage to comparable units and compare
        // Example implementation, adjust as needed
    };
    
    // Apply filters when filter state changes
    useEffect(() => {
        const filtered = items.filter(filterItem);
        setFilteredItems(filtered);
    }, [filter, items]);
    

    return (
        <div className="shop-container">
            <h1>Shop</h1>
            <div className="filters">
                {/* Price Filter */}
                <select name="price" onChange={handleFilterChange}>
                    <option value="">Select Price Range</option>
                    <option value="2001+">$2,001 or more</option>
                    <option value="1501-2000">$1,501 - $2,000</option>
                    {/* ... other price options */}
                </select>

                {/* Memory Filter */}
                <select name="memory" onChange={handleFilterChange}>
                    <option value="">Select Memory (RAM)</option>
                    <option value="32GB+">32 GB or more</option>
                    {/* ... other memory options */}
                </select>

                {/* Storage Size Filter */}
                <select name="storage" onChange={handleFilterChange}>
                    <option value="">Select Storage Size</option>
                    <option value="2TB+">2 TB or more</option>
                    {/* ... other storage options */}
                </select>

                {/* Processor Filter */}
                <select name="processor" onChange={handleFilterChange}>
                    <option value="">Select Processor</option>
                    <option value="all-intel">All Intel Processors</option>
                    {/* ... other processor options */}
                </select>

                {/* Processor Generation Filter */}
                <select name="processorGen" onChange={handleFilterChange}>
                    <option value="">Select Processor Generation</option>
                    <option value="13th-gen-intel">13th Gen Intel</option>
                    {/* ... other processor generation options */}
                </select>

                {/* Graphics Filter */}
                <select name="graphics" onChange={handleFilterChange}>
                    <option value="">Select Graphics</option>
                    <option value="all-nvidia">All NVIDIA Graphics</option>
                    {/* ... other graphics options */}
                </select>
            </div>
            <div className="items">
                {filteredItems.map(item => (
                    <div key={item.id} className="item">
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Memory: {item.memory}</p>
                        <p>Storage: {item.storage}</p>
                        <p>Processor: {item.processor}</p>
                        <p>Processor Generation: {item.processorGen}</p>
                        <p>Graphics: {item.graphics}</p>
                        <button className="buy-button">Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
