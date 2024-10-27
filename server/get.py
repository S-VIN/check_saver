from router import router

import psycopg2

try:
    conn = psycopg2.connect(dbname='check_saver', user='postgres', password='postgres', host='localhost', port='5400')
except:
    print('Can`t establish connection to database')


@router.get("/products/category/unique")
async def get_categories():
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT category FROM products")
    rows = cur.fetchall()
    categories = [row[0] for row in rows]
    return {"categories": categories}

@router.get("/products/brand/unique")
async def get_brands():
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT brand FROM products")
    rows = cur.fetchall()
    categories = [row[0] for row in rows]
    return {"brands": categories}

@router.get("/products/volume/unique")
async def get_volumes():
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT volume FROM products")
    rows = cur.fetchall()
    categories = [row[0] for row in rows]
    return {"volumes": categories}