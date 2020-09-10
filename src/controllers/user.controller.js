import User from '../models/User';

export async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        res.json({
            data: users
        })
    } catch (error) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Somethin goes wrong' + error
            }
        })
    }
}

export async function createUser(req, hash, res) {
    console.log('Si llego');
    // console.table(req.body);
    const { roleid, parentuserid, groupid, name, lastname, email, phone, remembertoken, age, avatar } = req.body;
    const password = hash;
    // console.log(roleid,
    //     parentuserid,
    //     groupid,
    //     name,
    //     lastname,
    //     email,
    //     phone,
    //     password,
    //     remembertoken,
    //     age,
    //     avatar);
    try {
        let newUser = await User.create({
            roleid,
            parentuserid,
            groupid,
            name,
            lastname,
            email,
            phone,
            password,
            remembertoken,
            age,
            avatar
        },
            {
                fields: ['roleid', 'parentuserid', 'groupid', 'name', 'lastname', 'email', 'phone', 'password', 'remembertoken', 'age', 'avatar']
            });
    
        if (newUser) {
            console.log(res)
            return res.json({
                message: 'User created successfully',
                data: newUser
            });
        }
        console.log(true)
        
    } catch (error) {
        
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Somethin goes wrong' + error
            }
        });
    }

}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const deleteRowCount = await User.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'User deleted',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Somethin goes wrong' + error
            }
        });
    }
}


export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { roleid, parentuserid, groupid, name, lastname, email, phone, password, remembertoken, age, avatar } = req.body;

        const data = await User.findAll({
            attributes: ['id', 'roleid', 'parentuserid', 'groupid', 'name', 'lastname', 'email', 'phone', 'password', 'remembertoken', 'age', 'avatar'],
            where: {
                id
            }
        });
        if (data.length > 0) {
            data.forEach(async User => {
                await User.update({
                    roleid,
                    parentuserid,
                    groupid,
                    name,
                    lastname,
                    email,
                    phone,
                    password,
                    remembertoken,
                    age,
                    avatar
                });
            })
        }


        return res.json({
            message: 'User Updated Succefully',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: {
                code: "ERROR",
                http_code: 500,
                message: 'Somethin goes wrong' + error
            }
        });
    }


}

export async function getOneUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where:{
                id
            }
        });
    res.json({
        data:user
    });
    } catch (error) {
        res.status(500).json({
            error:{
                code: "ERROR",
                http_code:500,
                message: 'Somethin goes wrong'+ error
            }
        });
    }
}
