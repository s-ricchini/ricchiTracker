DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS sidebar_elements;

CREATE TABLE sidebar_elements (
    id BINARY(16) PRIMARY KEY default UUID_TO_BIN(UUID()),
    name VARCHAR(255) NOT NULL,
    type ENUM('file', 'folder') NOT NULL,
    color VARCHAR(7) DEFAULT NULL, --hexadecimal
    parent_id BINARY(16) DEFAULT NULL,
    position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Restricción de Integridad Referencial
    CONSTRAINT fk_parent 
        FOREIGN KEY (parent_id) 
        REFERENCES sidebar_elements(id) 
        ON DELETE CASCADE
);