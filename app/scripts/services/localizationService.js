'use strict';

/**
 * @ngdoc service
 * @name cattlecrewCaseManagementUiApp.localizationService
 * @description
 * # localizationService
 * Factory in the cattlecrewCaseManagementUiApp.
 */
angular.module('cattlecrewCaseManagementUiApp')
  .factory('localizationService', function ($locale) {
    //
    // local namespace
    //
    var srv = {};

    /*
     * Returns the appropiate localized string for a given key and current locale
     */

    srv.res =  {
    	'appName': {
	     'de-de': 'CattleCrew Case Management UI',
	     'en-us': 'CattleCrew Case Mangement UI'
	},
     	'dashboard':{
	     'de-de': 'Dashboard',
	     'en-us': 'Dashboard'
     	},
	'New Case':{
		'de-de': 'Neuer Fall',
		'en-us': 'New Case'
	},
	'About':{
		'de-de': 'Über',
		'en-us': 'About'
	},
	'dashboardDesc':{
		'de-de': 'Übersicht über alle vorhandene Fälle',
		'en-us': 'Displaying all existing cases'
	},
	'search':{
		'de-de': 'Suche',
		'en-us': 'Search'
	},
	'filterCase':{
		'de-de': 'Filter Fälle',
		'en-us': 'Filter Case'
	},
	'businessId':{
		'de-de': 'Geschäfts-ID',
		'en-us': 'Business ID'
	},
	'case':{
		'de-de': 'Fall',
		'en-us': 'Case'
	},
	'technicalId':{
		'de-de': 'Technische ID',
		'en-us': 'Techical ID'
	},
	'created':{
		'de-de': 'Erstellt am',
		'en-us': 'Created'
	},
	'lastEdited':{
		'de-de': 'Zuletzt bearbeitet am',
		'en-us': 'Last Edited'
	},
	'status': {
		'de-de': 'Status',
		'en-us': 'Status'
	},
	'casesAreDisplayed':{
		'de-de': 'Fälle werden angezeigt',
		'en-us': 'Cases are displayed'
	},
	'fromTheOptizTeam':{
		'de-de': 'von dem OPITZ CONSULTING Team',
		'en-us': 'from the OPITZ CONSULTING TEAM'
	},
	'createNewCase':{
		'de-de': 'neuen Fall erstellen',
		'en-us': 'Create and initialize a new case'
	},
	'newCase':{
		'de-de': 'Neuer Fall',
		'en-us': 'New Case'
	},
	'selectAcase':{
		'de-de': 'Fallauswahl',
		'en-us': 'Select a case'
	},
	'createNewInstanceOf':{
		'de-de': 'Erzeuge eine neue Instanz von',
		'en-us': 'Create new instance of'
	},
	'inVersion':{
		'de-de': 'In Version',
		'en-us': 'in version'
	},
	'addVariable':{
		'de-de': 'Variable hinzufügen',
		'en-us': 'Add variable'
	},
	'backToOverview':{
		'de-de': 'Zurück zur Übersicht',
		'en-us': 'Back to overview'
	},
	'reset':{
		'de-de': 'Zurücksetzen',
		'en-us': 'Reset'
	},
	'create':{
		'de-de': 'Erstellen',
		'en-us': 'Create'
	},
	'value':{
		'de-de': 'Wert',
		'en-us': 'Value'
	},
	'select':{
		'de-de': 'Auswahl',
		'en-us': 'select'
	},
	'name':{
		'de-de': 'Name',
		'en-us': 'Name'
	},
	'type':{
		'de-de': 'Type',
		'en-us': 'Type'
	},
	'businessKey':{
		'de-de': 'Business Key',
		'en-us': 'Business Key'
	}
    };

    //
    // Public API
    //
    return {
      getString: function (key) {
        return srv.res[key][$locale.id ];
      }
    };
   });
