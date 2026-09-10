import re

with open('C:\\Users\\OMU\\.gemini\\antigravity\\scratch\\OMNIX EMPIRE PROJECT\\OMNIX PLAYLIST ZONE\\OMNIX-EMPIRE-website\\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

download_html = """                </div>

                <!-- 3. Latest Download CTA -->
                <div class="app-download-cta">
                    <h4 class="cta-title"><i class="fas fa-cloud-download-alt"
                            style="color: var(--primary); margin-right: 12px;"></i> Download Latest Version</h4>
                    <div class="download-buttons" style="display:flex; flex-wrap:wrap; gap:15px; align-items: center; justify-content: center;">
                        
                        <a href="https://www.mediafire.com/file/d0xgb3zpqfjpi9l/OMNIX-OTT_v2.7_Build-29_2026-09-09.apk/file" target="_blank"
                            onclick="trackDownload()" class="dl-btn" style="background: linear-gradient(135deg, #0078FF 0%, #0056b3 100%); display: flex; align-items: center; justify-content: center; width: auto; padding: 0 25px; border-radius: 12px; color: white; text-decoration: none; font-weight: bold; font-size: 1.1rem; font-family: 'Space Grotesk', sans-serif; height: 55px; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 20px rgba(0, 120, 255, 0.4); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                            <i class="fas fa-fire" style="margin-right: 10px; font-size: 1.4rem;"></i> MediaFire
                        </a>

                        <a href="https://pixeldrain.dev/api/file/8V4d8qmw?download" target="_blank"
                            onclick="trackDownload()" class="dl-btn" style="background: linear-gradient(135deg, #00b894 0%, #00876b 100%); display: flex; align-items: center; justify-content: center; width: auto; padding: 0 25px; border-radius: 12px; color: white; text-decoration: none; font-weight: bold; font-size: 1.1rem; font-family: 'Space Grotesk', sans-serif; height: 55px; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 20px rgba(0, 184, 148, 0.4); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                            <i class="fas fa-tint" style="margin-right: 10px; font-size: 1.4rem;"></i> PixelDrain
                        </a>

                    </div>
                </div>"""

# Insert right after the app-stats-grid ends
html = re.sub(r'                </div>\n\n\n                <!-- 4\. Features', download_html + r'\n\n                <!-- 4. Features', html, flags=re.DOTALL)

with open('C:\\Users\\OMU\\.gemini\\antigravity\\scratch\\OMNIX EMPIRE PROJECT\\OMNIX PLAYLIST ZONE\\OMNIX-EMPIRE-website\\index.html', 'w', encoding='utf-8') as f:
    f.write(html)
