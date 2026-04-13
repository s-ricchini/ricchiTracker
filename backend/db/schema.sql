DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS sidebar_elements;

CREATE TABLE sidebar_elements (
    id BINARY(16) PRIMARY KEY default (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    type ENUM('file', 'folder') NOT NULL,
    color VARCHAR(7) DEFAULT NULL,
    parent_id BINARY(16) DEFAULT NULL,
    position INT DEFAULT 0,
    is_open BOOL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Restricción de Integridad Referencial
    CONSTRAINT fk_parent 
        FOREIGN KEY (parent_id) 
        REFERENCES sidebar_elements(id) 
        ON DELETE CASCADE
);

CREATE TABLE blog_entrys (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),

    file_id BINARY(16) NOT NULL,
    
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Borrado en cascada automático
    CONSTRAINT fk_sidebar_element
        FOREIGN KEY (file_id) 
        REFERENCES sidebar_elements(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks(
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);