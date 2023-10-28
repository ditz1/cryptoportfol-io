import mysql.connector as conn

def connect_to_db():
    config = {
        'user' : 'adminuser',
        'password' : 'adminpassword',
        'host' : 'localhost',
        'database' : 'portfoliodb'
    }

    connection = conn.connect(**config)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM users, assets where users.uid=1")
    users = cursor.fetchall()

    cursor.close()
    connection.close

    return users

if  __name__ == '__main__':
    users = connect_to_db()
    for user in users:
        print(user)