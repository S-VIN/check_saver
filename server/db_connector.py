import psycopg2

conn = None
try:
    conn = psycopg2.connect(dbname='yuki_check_saver', user='postgres', password='postgres', host='localhost', port='5432')
except:
    print('Can`t establish connection to database')