'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">billit documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' : 'data-target="#xs-components-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' :
                                            'id="xs-components-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' : 'data-target="#xs-injectables-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' :
                                        'id="xs-injectables-links-module-AppModule-1158cb123b4368bbb783c075019c8943"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BillService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BillService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CsrfService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CsrfService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-51317bd144ebdcee27470ce5d4e809cd"' : 'data-target="#xs-components-links-module-AuthModule-51317bd144ebdcee27470ce5d4e809cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-51317bd144ebdcee27470ce5d4e809cd"' :
                                            'id="xs-components-links-module-AuthModule-51317bd144ebdcee27470ce5d4e809cd"' }>
                                            <li class="link">
                                                <a href="components/ContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CookiePolicyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CookiePolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DisclaimerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DisclaimerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PoliciesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PoliciesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyPolicyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyPolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TermAndConditionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TermAndConditionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' : 'data-target="#xs-components-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' :
                                            'id="xs-components-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' }>
                                            <li class="link">
                                                <a href="components/ActionsCellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionsCellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BilledCellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BilledCellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdfPreviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PdfPreviewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' : 'data-target="#xs-injectables-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' :
                                        'id="xs-injectables-links-module-DashboardModule-5faeefd570abe61d56f21e03fd24c5ac"' }>
                                        <li class="link">
                                            <a href="injectables/BillPdfService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BillPdfService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MiscFunctionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MiscFunctionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShowErrorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ShowErrorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesModule.html" data-type="entity-link">FeaturesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' : 'data-target="#xs-components-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' :
                                            'id="xs-components-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' }>
                                            <li class="link">
                                                <a href="components/FeaturesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeaturesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserPopoverComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserPopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' : 'data-target="#xs-injectables-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' :
                                        'id="xs-injectables-links-module-FeaturesModule-567fddb4f2eb9ef00467ae11aa20b16f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesRoutingModule.html" data-type="entity-link">FeaturesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GraphQLModule.html" data-type="entity-link">GraphQLModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewbillModule.html" data-type="entity-link">NewbillModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' : 'data-target="#xs-components-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' :
                                            'id="xs-components-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' }>
                                            <li class="link">
                                                <a href="components/NewbillComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewbillComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' : 'data-target="#xs-injectables-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' :
                                        'id="xs-injectables-links-module-NewbillModule-de3d3f784eced22f96fcda8790b51bba"' }>
                                        <li class="link">
                                            <a href="injectables/MiscFunctionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MiscFunctionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ShowErrorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ShowErrorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewbillRoutingModule.html" data-type="entity-link">NewbillRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedComponentsModule.html" data-type="entity-link">SharedComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedComponentsModule-a61bbd58873360c80906a0766ab89b4a"' : 'data-target="#xs-components-links-module-SharedComponentsModule-a61bbd58873360c80906a0766ab89b4a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedComponentsModule-a61bbd58873360c80906a0766ab89b4a"' :
                                            'id="xs-components-links-module-SharedComponentsModule-a61bbd58873360c80906a0766ab89b4a"' }>
                                            <li class="link">
                                                <a href="components/ViewTitleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewTitleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConfirmPasswordValidator.html" data-type="entity-link">ConfirmPasswordValidator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BillPdfService.html" data-type="entity-link">BillPdfService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BillService.html" data-type="entity-link">BillService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsrfService.html" data-type="entity-link">CsrfService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MiscFunctionsService.html" data-type="entity-link">MiscFunctionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShowErrorService.html" data-type="entity-link">ShowErrorService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/HttpXsrfInterceptor.html" data-type="entity-link">HttpXsrfInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/LogoutGuardService.html" data-type="entity-link">LogoutGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CustomResponse.html" data-type="entity-link">CustomResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link">LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterRequest.html" data-type="entity-link">RegisterRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SocialLoginRequest.html" data-type="entity-link">SocialLoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});