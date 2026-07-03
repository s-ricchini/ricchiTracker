
INSERT INTO sidebar_elements (id, name, type, color, parent_id, position) VALUES
(UUID_TO_BIN('550e8400-e29b-41d4-a716-446655440000'), 'Universidad', 'folder', '#4A90E2', NULL, 0),
(UUID_TO_BIN('6ba7b810-9dad-11d1-80b4-00c04fd430c8'), 'Programación', 'folder', '#50E3C2', NULL, 1);

INSERT INTO sidebar_elements (id, name, type, color, parent_id, position) VALUES

(UUID_TO_BIN('ad647242-23f4-4f9e-b765-680455799767'), 'Álgebra Lineal', 'file', NULL, UUID_TO_BIN('550e8400-e29b-41d4-a716-446655440000'), 0),
(UUID_TO_BIN('f47ac10b-58cc-4372-a567-0e02b2c3d479'), 'Cálculo I', 'file', NULL, UUID_TO_BIN('550e8400-e29b-41d4-a716-446655440000'), 1),

(UUID_TO_BIN('7472de2a-0f1e-481b-a53d-2495d4d38c2a'), 'Notas de React', 'file', NULL, UUID_TO_BIN('6ba7b810-9dad-11d1-80b4-00c04fd430c8'), 0),
(UUID_TO_BIN('e3b0c442-98fc-11eb-a94d-2342f0a2931b'), 'Proyectos Personales', 'folder', '#F5A623', UUID_TO_BIN('6ba7b810-9dad-11d1-80b4-00c04fd430c8'), 1);

INSERT INTO sidebar_elements (id, name, type, color, parent_id, position) VALUES
(UUID_TO_BIN('8c459844-3c82-4f90-8e1d-346766467366'), 'Idea App Estudio', 'file', '#E91E63', UUID_TO_BIN('e3b0c442-98fc-11eb-a94d-2342f0a2931b'), 0);



--Datos de prueba para la tabla blog_entrys:

-- Entradas para "Notas de React" (7472de2a-0f1e-481b-a53d-2495d4d38c2a)
INSERT INTO blog_entrys (file_id, title, content) VALUES 
(
    UUID_TO_BIN('7472de2a-0f1e-481b-a53d-2495d4d38c2a'), 
    'Entendiendo el renderizado en React 19', 
    'Hoy estuve probando las mejoras de React 19. El manejo de las versiones de React-DOM es mucho más estricto ahora. Es clave recordar que las dependencias deben estar alineadas para evitar el error de mismatch.'
),
(
    UUID_TO_BIN('7472de2a-0f1e-481b-a53d-2495d4d38c2a'), 
    'Custom Hooks vs Context API', 
    'A veces abuso del Context API para cosas que podrían ser simplemente custom hooks. Para RicchiTracker, voy a intentar mantener el estado de la sidebar lo más local posible para evitar re-renders innecesarios.'
);

-- Entradas para "Ideas App Estudio" (8c459844-3c82-4f90-8e1d-346766467366)
INSERT INTO blog_entrys (file_id, title, content) VALUES 
(
    UUID_TO_BIN('8c459844-3c82-4f90-8e1d-346766467366'), 
    'Sistema de Repetición Espaciada', 
    'Idea: Implementar un algoritmo simple de repetición espaciada para los apuntes de la facultad. Podría usar la columna created_at para calcular cuándo toca volver a leer una nota.'
),
(
    UUID_TO_BIN('8c459844-3c82-4f90-8e1d-346766467366'), 
    'Integración con Pomodoro', 
    'Estaría bueno que las entradas del diario se puedan vincular a sesiones de estudio de 25 minutos. Así puedo ver cuánto tiempo real le dediqué a cada concepto de la UBA.'
);