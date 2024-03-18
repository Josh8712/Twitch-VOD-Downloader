function FolderWalker(handlers) {
    this.nodes = {
        main: document.getElementById('folder-chooser'),
        contentArea: document.getElementById('content-area'),
        breadCrumbs: document.getElementById('bread-crumbs'),
        selectFolderBtn: document.getElementById('select-folder'),
        cancelBtn: document.getElementById('cancel-folder'),
        closer: document.getElementById('closer')
    };
    this.pathList = []

    this.storage = handlers.storage;
    this.onCancel = handlers.onCancel;
    this.onChosen = handlers.onChosen;

    this.nodes.loader = document.createElement('div');
    this.nodes.loader.id = 'loader';
    this.nodes.loader.classList.add('loader')

    this.setHandlers();
}

FolderWalker.prototype = {

    buildPath: function () {
        var str = 'root'
        if (this.pathList.length > 0)
            str += ':'
        this.pathList.forEach(e => {
            str += '/'
            str += e
        })
        if (this.pathList.length > 0)
            str += ':'
        str += '/'
        return str
    },

    getFolderId: function () {
        var id = 'root'
        if (this.pathList.length > 0)
            id = this.pathList[this.pathList.length - 1].id
        return id
    },

    update: function () {
        this.show()
        var self = this
        this.nodes.selectFolderBtn.classList.add('not-active');
        this._showLoader();

        this.storage.getFoldersForPath(this.getFolderId())
            .then(children => {
                var containerNode = self.getFoldersElements(children);
                self.nodes.contentArea.textContent = '';
                self._handleBreadCrumbs();
                self.nodes.contentArea.appendChild(containerNode);
                containerNode.addEventListener('click', function (e) {
                    try {
                        var cL = e.target.classList;
                        if (cL.contains('folder-line')) {
                            self.clearSelected();
                            cL.add('selected');
                            if ((cL.contains('back-line') && e.target.getAttribute('data-item-id') !== 'null') || cL.contains('folder-line-disabled')) {
                                self.nodes.selectFolderBtn.classList.add('not-active');
                            } else
                                self.nodes.selectFolderBtn.classList.remove('not-active');
                        }
                    } catch (e) {
                        self.nodes.contentArea.textContent = '';
                        self.showError(e.message);
                    }
                });
                containerNode.addEventListener('dblclick', function (e) {
                    try {
                        if (e.target.getAttribute('title') !== null) {
                            containerNode.remove();
                            containerNode = null;
                            self.nodes.selectFolderBtn.classList.add('not-active');
                            if(e.target.getAttribute('title') == '..')
                                self.pathList.pop()
                            else
                                self.pathList.push({
                                    id: e.target.getAttribute('data-item-id'),
                                    title: e.target.getAttribute('title'),
                                })
                            self.update();
                        }
                    } catch (e) {
                        self.nodes.contentArea.textContent = '';
                        self.showError(e.message);
                    }
                });
            }).catch(errorResp => {
                self.nodes.contentArea.textContent = '';
                self.showError(errorResp.message);
            })
    },

    getFoldersElements: function (folders) {
        var folder;
        var folderNode;
        var containerNode;
        var backLine;

        containerNode = document.createElement('div');
        containerNode.id = 'folders-container';

        if (this.pathList.length > 0) {
            backLine = document.createElement('div');
            backLine.className = 'folder-line ' + 'back-line';
            backLine.textContent = '..';
            backLine.setAttribute('title', "..");
            containerNode.appendChild(backLine);
        }

        if (folders.length) {
            for (var i = 0; i < folders.length; i++) {
                folder = folders[i];
                folder.title = folder.title || folder.name
                folderNode = document.createElement('div');
                folderNode.className = 'folder-line';
                folderNode.textContent = folder.title;
                folderNode.setAttribute('title', folder.title);
                folderNode.setAttribute('data-item-id', folder.id);
                containerNode.appendChild(folderNode);
            }
        } else {
            var noItemsNode = document.createElement('div');
            noItemsNode.className = 'info-line';
            noItemsNode.textContent = "沒有資料夾";
            containerNode.appendChild(noItemsNode);
        }

        return containerNode;
    },

    showError: function (error) {
        var errorNode = document.createElement('div');
        errorNode.className = 'error-line';
        errorNode.textContent = error;

        this.nodes.contentArea.appendChild(errorNode);
    },

    _showLoader: function () {
        this.nodes.contentArea.textContent = '';
        this.nodes.contentArea.appendChild(this.nodes.loader);
    },

    clearSelected: function () {
        var self = this;
        Array.prototype.forEach.call(this.nodes.contentArea.querySelectorAll('.folder-line'), function (e) {
            e.classList.remove('selected');
        });
    },

    show: function () {
        document.body.style.overflow="hidden"
        this.nodes.main.parentElement.style.display = '';
    },

    hide: function () {
        document.body.style.overflow=""
        this.nodes.main.parentElement.style.display = 'none';
    },

    _handleBreadCrumbs: function () {
        var self = this
        this.nodes.breadCrumbs.textContent = ''
        var home = document.createElement('a')
        home.innerText = 'home'
        home.target = 0
        this.nodes.breadCrumbs.appendChild(home)
        for (let idx = 0; idx < this.pathList.length; idx++) {
            const node = this.pathList[idx];
            var a = document.createElement('a')
            var span = document.createElement('span')
            span.innerText = "/"
            a.innerText = node.title
            a.target = idx + 1
            this.nodes.breadCrumbs.appendChild(span)
            this.nodes.breadCrumbs.appendChild(a)
        }
        var links = this.nodes.breadCrumbs.querySelectorAll('a')
        for (let idx = 0; idx < links.length; idx++) {
            var link = links[idx]
            link.addEventListener('click', function(e) {
                e.preventDefault()
                self.pathList = self.pathList.slice(0, parseInt(e.target.target))
                self.update()
            })
        }
        
    },

    setHandlers: function () {
        var self = this;
        this.nodes.closer.addEventListener('click', function () {
            self.onCancel && self.onCancel(new Error("使用者取消認證"));
            self.hide();
        });

        this.nodes.cancelBtn.addEventListener('click', function () {
            self.onCancel && self.onCancel(new Error("使用者取消認證"));
            self.hide();
        });

        this.nodes.selectFolderBtn.addEventListener('click', function (e) {
            if (!e.target.classList.contains('not-active')) {
                var folders = self.nodes.contentArea.querySelectorAll('.folder-line');
                if (folders && folders.length) {
                    Array.prototype.forEach.call(folders, function (folder) {
                        if (folder.classList.contains('selected')) {
                            var title = folder.getAttribute('title');
                            var folderId = folder.getAttribute('data-item-id');
                            if (folderId === 'null') {
                                folderId = '';
                            }
                            self.hide();
                            self.onChosen && self.onChosen(title, folderId);
                        }
                    });
                }
            }
        });
    }
};