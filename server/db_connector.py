import psycopg2

conn = None
try:
    conn = psycopg2.connect(dbname='check_saver', user='stepan-vinokurov', password='stepan-vinokurov', host='195.133.21.239', port='5400')
except:
    print('Can`t establish connection to database')