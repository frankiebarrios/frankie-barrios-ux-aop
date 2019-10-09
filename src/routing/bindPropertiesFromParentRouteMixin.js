/*
 * Sets up a property observer for all properties defined in this route node's
 * `inheritedProperties` (defined in application route tree config). Sets `this`
 * property of the same name upon initialization and when any of them change.
 * This is effectively one way binding from a parent route node to a child
 * route node for all `inheritedProperties`.
 * e.g. from /projects/people/src/js/routing/routes.js
 * ```
 *   {
 *     title: 'Dashboard',
 *     inheritedProperties: ['selectedInstitution', 'applications'],
 *     args: [ROUTE_IDS.DASHBOARD, 'dashboard-container', ROUTE_PATHS.DASHBOARD, ['institutionShortId']]
 *   }
 * ```
 */
export default function bindPropertiesFromParentRouteMixin (Superclass) {
  class BindPropertiesFromParentRoute extends Superclass {
    constructor () {
      super();
      this._propertiesBound = false;
    }

    _getPropertyObserverFunctionName (property) {
      return `_observeParent${property}Changed`;
    }

    // Polymer has a _create(Property|Method)Observer function (used in _bindPropertiesFromParent), but not a _remove one.
    _removePropertyObserver (property) {
      const effects = this.parentElement[this.PROPERTY_EFFECT_TYPES.OBSERVE][property];
      this.parentElement[this.PROPERTY_EFFECT_TYPES.OBSERVE][property] =
        effects.filter(effect => {
          return effect.info.methodName !== this._getPropertyObserverFunctionName(property);
        });
    }

    _createObserverFunction (property) {
      return (newValue, changes) => {
        this[property] = changes.base;
        this.notifyPath(changes.path);
      }
    }

    _bindPropertiesFromParent (properties) {
      if (!this.parentElement) { return; }
      this._propertiesBound = true;
      properties.forEach(property => {
        // set local property initially
        this[property] = this.parentElement[property];
        // create an observer function on the parent element
        const observerFunctionName = this._getPropertyObserverFunctionName(property);
        this.parentElement[observerFunctionName] = this._createObserverFunction(property);
        // create complex observer for the property
        this.parentElement._createMethodObserver(
          `${observerFunctionName}(${property}, ${property}.*)`
        );
      });
    }

    _unbindPropertiesFromParent (properties) {
      this._propertiesBound = false;
      properties.forEach(property => {
        this._removePropertyObserver(property);
        delete this.parentElement[this._getPropertyObserverFunctionName(property)];
      });
    }

    routeEnter (currentNode, nextNodeIfExists, routeId, context, next) {
      if (!this._propertiesBound) {
        this._bindPropertiesFromParent(currentNode.inheritedProperties);
      }
      super.routeEnter(...arguments);
    }

    routeExit (currentNode, nextNodeIfExists, routeId, context, next) {
      if (this._propertiesBound) {
        this._unbindPropertiesFromParent(currentNode.inheritedProperties);
      }
      super.routeExit(...arguments);
    }
  }
  return BindPropertiesFromParentRoute;
}