declare const bootstrap: any;
import { Component, HostListener } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
	showMenu = false;
	isSmallScreen = window.innerWidth <= 992;
	activeSection: string | null = null;

menuItems = [
    { label: 'HOMEPAGE', link: '#home' },
    { label: 'CHI SIAMO', link: '#about' },
    { label: 'FOTO', link: '#gallery' },
    { label: 'ATTIVITÀ', link: '#activities' },
    { label: 'SERVIZI', link: '#services' },
    { label: 'CONTATTI', link: '#contact' },
];

languages = [
  { code: 'it', label: 'Italiano', img: 'assets/images/italyFlag.svg' },
  { code: 'es', label: 'Español', img: 'assets/images/spainFlag.png' },
  { code: 'en', label: 'English', img: 'assets/images/unitedKingdomFlag.svg' }
];

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.isSmallScreen = event.target.innerWidth <= 992;
	}

	@HostListener("window:scroll", [])
	onWindowScroll() {
		const sections = ["about", "gallery", "activities", "services", "contact"];
		const scrollPosition = window.scrollY;
		let activeSection: string | null = null;

		for (const section of sections) {
			const element = document.getElementById(section);
			if (element) {
				const offsetTop = element.offsetTop;
				if (scrollPosition >= offsetTop - 120) {
					activeSection = section;
				}
			}
		}

		this.activeSection = activeSection;
		this.showMenu = window.scrollY > 90;
	}

  constructor(public translate: TranslateService) {
    this.translate.addLangs(this.languages.map(lang => lang.code));
    this.translate.setDefaultLang('it');
    this.translate.use('it');

    this.onResize({ target: { innerWidth: window.innerWidth } });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

	closeOffcanvas() {
		const offcanvasElement = document.getElementById("offcanvasScrolling");
		const backdrop = document.querySelector(".offcanvas-backdrop");

		if (offcanvasElement) {
			// Bootstrap 5 Offcanvas instance
			const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
			if (bsOffcanvas) {
				bsOffcanvas.hide();
			}
		}

		// Remove backdrop manually (optional fallback)
		if (backdrop) {
			backdrop.remove();
		}
	}
}
