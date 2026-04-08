-- Limpiamos la tabla para empezar de cero
DELETE FROM sidebar_elements;

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