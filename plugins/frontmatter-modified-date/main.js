/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => FrontmatterModified
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  frontmatterProperty: "modified",
  momentFormat: "",
  excludedFolders: []
};
var FrontmatterModified = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.timer = {};
  }
  async onload() {
    await this.loadSettings();
    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (file instanceof import_obsidian.TFile && this.settings.excludedFolders.every((folder) => !file.path.startsWith(folder + "/"))) {
        clearTimeout(this.timer[file.path]);
        this.timer[file.path] = setTimeout(() => {
          this.app.fileManager.processFrontMatter(file, (frontmatter) => {
            frontmatter[this.settings.frontmatterProperty] = (0, import_obsidian.moment)().format(this.settings.momentFormat);
          });
        }, 12 * 1e3);
      }
    }));
    this.addSettingTab(new FrontmatterModifiedSettingTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var FrontmatterModifiedSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Update modified date settings" });
    new import_obsidian.Setting(containerEl).setName("Frontmatter property").setDesc("The name of the YAML/frontmatter property to update").addText((text) => text.setPlaceholder("modified").setValue(this.plugin.settings.frontmatterProperty).onChange(async (value) => {
      this.plugin.settings.frontmatterProperty = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("Date format").setDesc("This is in MomentJS format. Leave blank for the default ATOM format.").addText((text) => text.setPlaceholder("ATOM format").setValue(this.plugin.settings.momentFormat).onChange(async (value) => {
      this.plugin.settings.momentFormat = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("Exclude folders").setDesc("Add a list of folders to exclude, one folder per line. All subfolders will be also excluded.").addTextArea((text) => text.setValue(this.plugin.settings.excludedFolders.join("\n")).onChange(async (value) => {
      this.plugin.settings.excludedFolders = value.split("\n").map((x) => x.trim()).filter((x) => !!x);
      await this.plugin.saveSettings();
    }));
  }
};
