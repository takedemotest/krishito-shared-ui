import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

class IconService {
    iconRegistry = inject(MatIconRegistry);
    sanitizer = inject(DomSanitizer);
    constructor() {
        this.registerIcons(['addicon']);
    }
    registerIcons(iconNames) {
        iconNames.forEach(icon => {
            this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-icons/${icon}.svg`));
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.8", ngImport: i0, type: IconService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.0.8", ngImport: i0, type: IconService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.8", ngImport: i0, type: IconService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { IconService };
//# sourceMappingURL=takedemotest-krishito-ui-icons.mjs.map
