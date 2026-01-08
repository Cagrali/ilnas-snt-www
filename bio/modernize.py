import os
import re
from bs4 import BeautifulSoup

# Define files to skip
IGNORE_FILES = ['cansu.html', 'simao.html', 'guilhem.html', 'hakan.html',
 'index.html', '404.html', 'navbar.js', 'greg.html', 'pascal.html',
 'profile-template.html', 'about.html', 'contact.html', 'news-and-impact.html', 'modernize.py']

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;700;800&display=swap" rel="stylesheet">
</head>
<body class="profile-page">
    <script>
        const profileData = {{
            name: "{name}",
            image: "{image}",
            email: "{email}",
            office: "{office}",
            linkedin: "{linkedin}",
            scholar: "{scholar}",
            bio: `{bio}`,
            standards: `<li>Technical Standardisation</li>`,
            interests: ["Research", "Standardisation"]
        }};
    </script>
    <main class="main-container" style="padding-top: 160px; padding-bottom: 80px;">
        <div class="profile-header" style="display: grid; grid-template-columns: 300px 1fr; gap: 4rem; align-items: start;">
            <aside class="profile-sidebar">
                <div class="circle snt-border" style="width: 250px; height: 250px; margin-bottom: 2rem;">
                    <img id="profile-img" src="" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="contact-card" style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <h4 style="margin-bottom: 1rem; color: var(--primary);">Contact</h4>
                    <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Email:</strong><br> 
                       <a id="profile-email" href="" style="color: var(--secondary); text-decoration: none;"></a>
                    </p>
                    <p style="font-size: 0.9rem; margin-bottom: 1rem;"><strong>Office:</strong><br> <span id="profile-office"></span></p>
                    <div class="social-links" style="display: flex; gap: 1rem;">
                        <a id="profile-linkedin" href="" style="opacity: 0.6; text-decoration: none;">LinkedIn</a>
                        <a id="profile-scholar" href="" style="opacity: 0.6; text-decoration: none;">Google Scholar</a>
                    </div>
                </div>
            </aside>
            <div class="profile-content">
                <h1 style="font-size: 3rem; color: var(--dark); margin-bottom: 0.5rem;" class="name-var"></h1>
                <section class="bio-text" style="margin-bottom: 3rem;">
                    <h3 style="border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Biography</h3>
                    <div id="profile-bio" style="line-height: 1.8; color: #475569;"></div>
                </section>
                <section class="standards-focus" style="margin-bottom: 3rem; background: var(--white); padding: 2rem; border-radius: 15px; border-left: 6px solid var(--secondary);">
                    <h3 style="margin-bottom: 1rem; color: var(--secondary);">Standardisation Activities</h3>
                    <ul id="profile-standards" style="list-style: disc; padding-left: 1.5rem; color: #475569;"></ul>
                </section>
                <section class="research-interests">
                    <h3 style="border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Research Interests</h3>
                    <div id="profile-interests" style="display: flex; flex-wrap: wrap; gap: 1rem;"></div>
                </section>
            </div>
        </div>
    </main>
    <nav></nav><footer></footer>
    <script src="../navbar.js"></script>
    <script>
        document.title = "Profile: " + profileData.name + " | ILNAS-SnT Hub";
        document.querySelectorAll('.name-var').forEach(el => el.textContent = profileData.name);
        document.getElementById('profile-img').src = profileData.image;
        document.getElementById('profile-email').href = "mailto:" + profileData.email;
        document.getElementById('profile-email').textContent = profileData.email;
        document.getElementById('profile-office').textContent = profileData.office;
        document.getElementById('profile-linkedin').href = profileData.linkedin || "#";
        document.getElementById('profile-scholar').href = profileData.scholar || "#";
        document.getElementById('profile-bio').innerHTML = profileData.bio;
        document.getElementById('profile-standards').innerHTML = profileData.standards;
        const interestContainer = document.getElementById('profile-interests');
        profileData.interests.forEach(i => {{
            const s = document.createElement('span');
            s.style = "background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;";
            s.textContent = i;
            interestContainer.appendChild(s);
        }});
    </script>
</body>
</html>
"""

def modernize():
    # Create output directory
    output_dir = 'modernized_pages'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created folder: {output_dir}")

    for filename in os.listdir('.'):
        if filename.endswith('.html') and filename not in IGNORE_FILES:
            print(f"Reading: {filename}")
            
            try:
                with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
                    soup = BeautifulSoup(f, 'html.parser')
                
                # NAME
                h3_tag = soup.find('h3')
                name = h3_tag.get_text().strip() if h3_tag else filename.replace('.html', '').replace('-', ' ').title()

                # IMAGE (Force relative path to parent public folder)
                img_tag = soup.find('img', src=re.compile(r'public/'))
                image_src = img_tag['src'] if img_tag else f"public/{filename.replace('.html', '')}-200w.png"
                image_path = "../" + image_src if not image_src.startswith("../") else image_src

                # BIO
                bio_html = ""
                spans = soup.find_all('span')
                if spans:
                    target = max(spans, key=lambda s: len(s.get_text()))
                    raw = "".join([str(c) for c in target.contents])
                    raw = re.sub(r'</?span[^>]*>', '', raw)
                    paras = re.split(r'(?:<br\s*/?>\s*)+', raw, flags=re.IGNORECASE)
                    for p in paras:
                        txt = BeautifulSoup(p, "html.parser").get_text().strip()
                        if len(txt) > 20:
                            bio_html += f"<p style='margin-bottom:1.5rem;'>{txt}</p>"

                # LINKS
                email = f"{filename.replace('.html', '')}@uni.lu"
                linkedin = "#"
                scholar = "#"
                for a in soup.find_all('a'):
                    href = a.get('href', '')
                    if 'mailto:' in href: email = href.replace('mailto:', '')
                    if 'linkedin.com' in href: linkedin = href
                    if 'scholar.google' in href: scholar = href

                # WRITE TO NEW FOLDER
                final_html = TEMPLATE.format(
                    name=name, image=image_path, email=email, office="Southlane Tower 1, Belvaux",
                    linkedin=linkedin, scholar=scholar, bio=bio_html
                )

                output_path = os.path.join(output_dir, filename)
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(final_html)
                print(f"--- Saved new file to: {output_path}")

            except Exception as e:
                print(f"--- Error on {filename}: {e}")

if __name__ == "__main__":
    modernize()