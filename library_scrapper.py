import os
import sqlite3
                    
def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_year(conn, year):
    cur = conn.cursor()

    sql = 'SELECT COUNT(*) FROM years WHERE year = ' + year
    cur.execute(sql)

    rows = cur.fetchall()
    if rows[0][0] == 0:
        yearRow = (int(year), 'The year of ' + year)
        sql = ''' INSERT INTO years(year,description)
              VALUES(?,?) '''
        cur.execute(sql, yearRow)
        conn.commit()


def create_album(conn, album, year):
    cur = conn.cursor()

    sql = 'SELECT COUNT(*) FROM albums WHERE name = \'' + album + "'"
    cur.execute(sql)

    rows = cur.fetchall()
    if rows[0][0] == 0:
        albumRow = (album, int(year), 'The album showing ' + album)
        sql = ''' INSERT INTO albums(name,year,description)
              VALUES(?,?,?) '''
        cur.execute(sql, albumRow)
        conn.commit()
    return cur.lastrowid

def fileFilter(ele):
    return ele[0] != '.'

baseFolder = 'test'
conn = create_connection("photoviewer.db")
with conn:
    for (root,dirs,files) in os.walk(baseFolder, topdown=True): 
        if root.replace(baseFolder, '').count(os.sep) == 2:
            print(root)
            print(dirs)
            print(list(filter(fileFilter,files)))
            print('--------------------------------')
            year = root[root.index('/')+1:]
            year = year[:root.index('/')]
            print('year: ' + year)
            create_year(conn, year)
            album = os.path.basename(root)
            print('album: ' + album)
            album_id = create_album(conn, album, year)
            for f in files:
                if str(f)[0] != '.':
                    path = root + '/' + f
                    print('path: ' + path)
                    photoRow = (path, album_id, 'The picture named ' + f)
                    cur = conn.cursor()
                    sql = '''INSERT INTO photos(photo_path,album,description)
                            VALUES(?,?,?) '''
                    cur.execute(sql, photoRow)
                    conn.commit()