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

function getView() {
  return App.MainAlertsManageAlertGroupView.create({
    controller: Em.Object.create()
  });
}

describe('App.MainAlertsManageAlertGroupView', function () {

  App.TestAliases.testAsComputedIfThenElse(getView(), 'removeButtonTooltip', 'controller.isRemoveButtonDisabled', Em.I18n.t('alerts.actions.manage_alert_groups_popup.removeButtonDisabled'), Em.I18n.t('alerts.actions.manage_alert_groups_popup.removeButton'))

});
