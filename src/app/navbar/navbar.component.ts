import {Component, HostListener} from "@angular/core";

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
  {label: "INIZIO", link: "#home"},
  {label: "CHI SIAMO", link: "#about"},
  {label: "FOTO", link: "#gallery"},
  {label: "ATTIVITÀ", link: "#activities"},
  {label: "SERVIZI", link: "#services"},
  {label: "CONTATTO", link: "#contact"},
];

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.isSmallScreen = event.target.innerWidth <= 992;
	}

	@HostListener("window:scroll", [])
	onWindowScroll() {
		// Determine the active section based on scrolling
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

		// Check if the user has scrolled and show menu
		this.showMenu = window.scrollY > 90;
	}

	constructor() {
		// Trigger the initial check for screen size
		this.onResize({target: {innerWidth: window.innerWidth}});
	}
}
