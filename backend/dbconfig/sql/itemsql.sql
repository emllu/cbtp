-- Drop the existing items table if it exists
DROP TABLE IF EXISTS items;

-- Create a new items table with the desired columns
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
   price int(60) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    img_url VARCHAR(255) NOT NULL
);

-- Insert items from items1 array
INSERT INTO items (name, price, img_url) VALUES 
    ('oil', '1000', 'oil.jpg'),
    ('sugar', '120', 'sugar.jpg'),
    ('flour', '120', 'images/flour.jpg'),
    ('rice', '80', 'rice.jpg'),
    ('salt', '30', 'salt.jpg');

-- Insert items from items2 array
INSERT INTO items (name, price, img_url) VALUES 
    ('pasta', '100', 'pasta.jpg'),
    ('makaroni', '120', 'makaroni.jpg'),
    ('buna', '320', 'buna.jpg'),
    ('teff', '55', 'teff.jpg'),
    ('Berbere', '330', 'berbere.jpg');

-- Insert items from items3 array
INSERT INTO items (name, price, img_url) VALUES 
    ('omo', '100', 'omo.jpg'),
    ('ajax', '20', 'ajax.jpg'),
    ('largo', '120', 'largo.jpg'),
    ('lux', '55', 'lux.jpg'),
    ('handwash', '130', 'handwash.jpg');

-- Insert items from items4 array
INSERT INTO items (name, price, img_url) VALUES 
    ('life boy', '100', 'lifeboy.jpg'),
    ('cloth', '65', 'soap.jpg'),
    ('bekas', '120', 'sofi.jpg'),
    ('kolo', '200', 'kolo.jpg'),
    ('kemem', '205', 'kemem.jpg');
