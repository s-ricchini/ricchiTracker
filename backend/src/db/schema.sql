DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS blog_entrys;
DROP TABLE IF EXISTS sidebar_elements;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    username VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL
);

CREATE TABLE sidebar_elements (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    user_id BINARY(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('file', 'folder') NOT NULL,
    color VARCHAR(7) DEFAULT NULL,
    parent_id BINARY(16) DEFAULT NULL,
    position INT DEFAULT 0,
    is_open BOOL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_sidebar_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_parent 
        FOREIGN KEY (parent_id) 
        REFERENCES sidebar_elements(id) 
        ON DELETE CASCADE
);

CREATE TABLE blog_entrys (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    user_id BINARY(16) NOT NULL,
    file_id BINARY(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_blog_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_sidebar_element
        FOREIGN KEY (file_id) 
        REFERENCES sidebar_elements(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    user_id BINARY(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE refreshTokens (
    id        INT PRIMARY KEY AUTO_INCREMENT,
    user_id   binary(16) NOT NULL,
    token     VARCHAR(512) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);