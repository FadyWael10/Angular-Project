import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoleOnly]',
  standalone: true
})
export class RoleOnlyDirective {
  private currentUserRole: string | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.currentUserRole = localStorage.getItem('role'); // get role from localStorage
  }

  @Input() set appRoleOnly(allowedRole: string) {
    this.viewContainer.clear();

    if (this.currentUserRole === allowedRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
