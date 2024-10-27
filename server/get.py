from router import router
from db_connector import conn


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