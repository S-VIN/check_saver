from router import router
from db_connector import conn
from psycopg2.extras import RealDictCursor


@router.get("/api/products/category/unique")
async def get_categories():
    with (conn.cursor() as cur):
        cur.execute("SELECT DISTINCT category FROM products")
        rows = cur.fetchall()
        categories = []
        for row in rows:
            categories.append(row[0])
        return categories

@router.get("/api/products/brand/unique")
async def get_brands():
    with conn.cursor() as cur:
        cur.execute("SELECT DISTINCT brand FROM products")
        rows = cur.fetchall()
        brands = []
        for row in rows:
            brands.append(row[0])
        return brands

@router.get("/api/products/volume/unique")
async def get_volumes():
    with conn.cursor() as cur:
        cur.execute("SELECT DISTINCT volume FROM products")
        rows = cur.fetchall()
        volumes = []
        for row in rows:
            volumes.append(row[0])
        return volumes

@router.get("/api/products/unique")
async def get_volumes():
    with conn.cursor() as cursor:
        cursor.execute("SELECT DISTINCT id, name, volume, brand, category FROM products")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            item = {'id': row[0], 'name': row[1], 'volume': row[2], 'brand': row[3], 'category': row[4]}
            result.append(item)
        return result

@router.get("/api/purchases/shop/unique")
async def get_shops():
    with conn.cursor() as cur:
        cur.execute("SELECT DISTINCT shop FROM purchases")
        rows = cur.fetchall()
        shops = []
        for row in rows:
            shops.append(row[0])
        return shops

@router.get("/api/purchases/tag/unique")
async def get_tag():
    with conn.cursor() as cur:
        cur.execute("SELECT DISTINCT unnest(tags) FROM purchases;")
        rows = cur.fetchall()
        tags = []
        for row in rows:
            tags.append(row[0])
        return tags