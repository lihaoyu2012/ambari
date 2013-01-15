/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');
var validator = require('utils/validator');
var componentHelper = require('utils/component');

App.MainHostController = Em.ArrayController.extend({
  name:'mainHostController',
  content: App.Host.find(),
  comeWithFilter: false,

  /**
   * Components which will be shown in component filter
   */
  componentsForFilter:function() {
    var installedComponents = componentHelper.getInstalledComponents();
    installedComponents.setEach('checkedForHostFilter', false);
    return installedComponents;
  }.property(),

  masterComponents:function () {
    return this.get('componentsForFilter').filterProperty('isMaster', true);
  }.property('componentsForFilter'),

  slaveComponents:function () {
    return this.get('componentsForFilter').filterProperty('isSlave', true);
  }.property('componentsForFilter'),

  clientComponents: function() {
    return this.get('componentsForFilter').filterProperty('isClient', true);
  }.property('componentsForFilter'),

  /**
   * Filter hosts by componentName of <code>component</code>
   * @param component App.HostComponent
   */
  filterByComponent:function (component) {
    var id = component.get('componentName');

    this.get('componentsForFilter').setEach('checkedForHostFilter', false);
    this.get('componentsForFilter').filterProperty('id', id).setEach('checkedForHostFilter', true);

    this.set('comeWithFilter', true);
  },

  decommissionButtonPopup:function () {
    var self = this;
    App.ModalPopup.show({
      header:Em.I18n.t('hosts.decommission.popup.header'),
      body:Em.I18n.t('hosts.decommission.popup.body'),
      primary:'Yes',
      secondary:'No',
      onPrimary:function () {
        alert('do');
        this.hide();
      },
      onSecondary:function () {
        this.hide();
      }
    });
  },
  deleteButtonPopup:function () {
    var self = this;
    App.ModalPopup.show({
      header:Em.I18n.t('hosts.delete.popup.header'),
      body:Em.I18n.t('hosts.delete.popup.body'),
      primary:'Yes',
      secondary:'No',
      onPrimary:function () {
        self.removeHosts();
        this.hide();
      },
      onSecondary:function () {
        this.hide();
      }
    });
  },
  removeHosts:function () {
    var hosts = this.get('content');
    var selectedHosts = hosts.filterProperty('isChecked', true);
    selectedHosts.forEach(function (_hostInfo) {
      console.log('Removing:  ' + _hostInfo.hostName);
    });
    this.get('fullContent').removeObjects(selectedHosts);
  },

  checkRemoved:function (host_id) {
    var hosts = this.get('content');
    var selectedHosts = hosts.filterProperty('id', host_id);
    this.get('fullContent').removeObjects(selectedHosts);
  }

});