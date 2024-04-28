CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    last_login_token VARCHAR(255) DEFAULT NULL;
);

-- Insert sample admin data
INSERT INTO admins (username, email, password) VALUES
('admin1', 'admin1@example.com', 'password1'),
('admin2', 'admin2@example.com', 'password2'),
('admin3', 'admin3@example.com', 'password3');


//adding token COLUMN
ALTER TABLE admins
ADD COLUMN last_login_token VARCHAR(255) DEFAULT NULL;

//////////////
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all required fields" });
    }
    try {
        // Checking if the email exists
        const [user] = await dbconnection.query("SELECT admin_id , username, Password FROM Users WHERE Email=?", [email]);

        // If there is no user with the provided email
        if (user.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "There is no user with the provided email. Please register." });
        }

        // Checking the password
        const isPasswordValid = await bcrypt.compare(password, user[0].Password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Incorrect password" });
        }

        // If email and password are correct, generate JWT
        const secretKey = "your-secret-key"; // Replace this with your actual secret key
        const username = user[0].username;
        const userid = user[0].admin_id;
        const token = jwt.sign({ username, userid }, secretKey, { expiresIn: "1d" });

        console.log("User login successful:", { username, userid }); // Log successful login
        return res.status(StatusCodes.OK).json({ msg: "User login successful", token });

    } catch (err) {
        console.error("Error in login:", err); // Log error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again" });
    }
}


//check the user
//sql for items
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT DEFAULT 0,
    image_url VARCHAR(255)
);