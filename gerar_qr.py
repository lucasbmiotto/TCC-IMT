import qrcode
import json
from PIL import Image

# Conteúdo JSON da credencial
data = {
    "id": "rg123",
    "title": "RG",
    "description": "Documento de identidade emitido em SP",
    "numero": "12.345.678-9",
    "emissor": "SSP-SP"
}

# Serializa para string JSON
json_data = json.dumps(data, ensure_ascii=False)

# Gera o QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(json_data)   # agora é string JSON
qr.make(fit=True)

# Cria imagem do QR Code
img = qr.make_image(fill_color="black", back_color="white")

# Salva como PNG
img.save("credencial_qr.png")

print("QR Code gerado e salvo como credencial_qr.png")
