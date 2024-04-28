CREATE TABLE cust_detail (
    cust_id INT(10) NOT NULL,
    username VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,  
    PASSWORD VARCHAR(255),       
    PRIMARY KEY (cust_id),
    FOREIGN KEY (cust_id) REFERENCES cust_infos(cust_id)  -- Reference to the cust_infos table
);

create table cust_infos( 
    cust_id int(10) not null ,
                         cust_bdate date,
                         cust_sexo char,
                         nationality varchar(10),
    cust_job varchar(10),
     FOREIGN key (cust_id) REFERENCES Cust_detail(Cust_id));



create table cust_address( cust_id int(10) not null,
                          keb_name varchar(255) not null,
                          House_no varchar (10) not null,
                          city varchar(15) not null,
                          FOREIGN key (cust_id) REFERENCES Cust_detail(Cust_id));
    create table cust_phone( 
       cust_id int(10) not null,
                       phone1 int(20) not null,
                          phone2 int(20) not null,
                         
                          FOREIGN key (cust_id) REFERENCES Cust_detail(Cust_id));
                          
    create table cust_age( 
        cust_id int(10) not null,
                       cust_age integer,
                          FOREIGN key (cust_id) REFERENCES Cust_detail(Cust_id));
                         
    create table cust_name( 
        cust_id int(10) not null
        cust_name varchar(255) not null,
        F_name varchar(12) not null,
        L_name varchar(12) not null,
           FOREIGN key (cust_id) REFERENCES Cust_detail(Cust_id));
           
create table kebele_info( 
       keb_name varchar(255) PRIMARY KEY,
       Region varchar(10) not null,
       City varchar(12) not null,
    mgr_id varchar(10) not null );
    
         create table kebele_location ( 
       keb_name varchar(255) not null,
       Region varchar(10) not null,
       City varchar(12) not null,
              FOREIGN key (keb_name) REFERENCES kebele_info(keb_id)
   );
         
   
                          
                    





///login


                    console.log(req.body)
    const { usernameOrEmail, password } = req.body;
   

    // Check if usernameOrEmail and password are provided
    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: "Please provide username/email and password" });
    }

    try {
        // Query the database to find the admin by username or email
        const [admins] = await dbconnection.query("SELECT * FROM admins WHERE username = ? OR email = ?", [usernameOrEmail, usernameOrEmail]);

        // Check if admin with the provided username or email exists
        if (admins.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const admin = admins[0];

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Fetch the last login token from the database
        

        // Generate a new JWT token for the authenticated admin
        const newToken = jwt.sign({ admin_id: admin.admin_id, username: admin.username }, 'your_secret_key', { expiresIn: '1h' });

        // Update the last login token in the database
        await dbconnection.query("UPDATE admins SET last_login_token = ? WHERE admin_id = ?", [newToken, admin.admin_id]);

        // Respond with the new token
        res.json({ token: newToken });

    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
}

async function adminRegister(req, res) {
    // Destructure request body
    // console.log(req.body)
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const [existingAdmins] = await dbconnection.query("SELECT * FROM admins WHERE username=? OR email=?", [username, email]);
        if (existingAdmins.length > 0) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a JWT token
        const token = jwt.sign({ username, email }, 'your_secret_key', { expiresIn: '1h' });

        // Store admin data in the database
        const sql = 'INSERT INTO admins (username, email, password,last_login_token ) VALUES (?, ?, ?, ?)';
      
        await dbconnection.query(sql, [username, email, hashedPassword, token]);

        // Respond with success message and token
        return res.status(201).json({ msg: "Admin registered successfully", token });

    } catch (error) {
        console.error("Error creating admin:", error);
        // return res.status(500).json({ error: "Error creating admin" });
    }