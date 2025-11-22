import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageDraw, ImageFont

# =============================
# DATA SETTINGS
# =============================
qr_url = "https://github.com/KamaleshSP/V-Web-Programming.git"
label_text = "230701138-WP"

# =============================
# GENERATE QR WITH ROUNDED STYLE
# =============================
qr = qrcode.QRCode(
    version=2,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=2,
)

qr.add_data(qr_url)
qr.make(fit=True)

qr_img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=RoundedModuleDrawer(),
    color_mask=SolidFillColorMask(front_color=(0,0,0), back_color=(255,255,255))
).convert("RGB")

# =============================
# CREATE CARD BACKGROUND
# =============================
padding = 40
label_height = 70
triangle_height = 20

card_width = qr_img.width + padding * 2
card_height = qr_img.height + padding * 2 + label_height + triangle_height + 20

card = Image.new("RGB", (card_width, card_height), "white")
draw = ImageDraw.Draw(card)

# =============================
# OUTER BLACK BORDER
# =============================
draw.rectangle(
    [10, 10, card_width - 10, card_height - 10],
    outline="black",
    width=4
)

# =============================
# PASTE QR CENTERED
# =============================
qr_x = (card_width - qr_img.width) // 2
qr_y = 40
card.paste(qr_img, (qr_x, qr_y))

# =============================
# DRAW TRIANGLE POINTER
# (top point touches QR bottom)
# =============================
qr_bottom = qr_y + qr_img.height        # bottom edge of QR
apex_y = qr_bottom                      # triangle tip at QR bottom
base_y = apex_y + triangle_height       # base below tip

triangle = [
    (card_width // 2 - 25, base_y),     # left base
    (card_width // 2 + 25, base_y),     # right base
    (card_width // 2, apex_y)           # top tip touching QR
]
draw.polygon(triangle, fill="black")

# =============================
# DRAW LABEL BOX
# =============================
label_y = base_y                        # label starts below triangle base
label_left = 40
label_right = card_width - 40
label_inner_width = label_right - label_left

draw.rectangle(
    [label_left, label_y, label_right, label_y + label_height],
    fill="black",
    outline="black",
    width=4
)

# =============================
# DRAW LABEL TEXT (AUTO-FIT)
# =============================
def get_font_that_fits(text, max_width, max_size=32, min_size=10):
    """Return a TTF font that fits within max_width, shrinking size if needed."""
    for size in range(max_size, min_size - 1, -2):
        try:
            font = ImageFont.truetype("arial.ttf", size)
        except:
            # If arial.ttf is not available, fall back to default once
            return ImageFont.load_default()
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        if text_w <= max_width - 20:  # keep side margins
            return font
    return ImageFont.load_default()

font = get_font_that_fits(label_text, label_inner_width)

bbox = draw.textbbox((0, 0), label_text, font=font)
text_w = bbox[2] - bbox[0]
text_h = bbox[3] - bbox[1]

text_x = label_left + (label_inner_width - text_w) // 2
text_y = label_y + (label_height - text_h) // 2

draw.text((text_x, text_y), label_text, fill="white", font=font)

# =============================
# SAVE OUTPUT
# =============================
card.save("manual_style_qr_with_url.png")
print("Manual-style QR generated: manual_style_qr_with_url.png")
