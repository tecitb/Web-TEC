<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
<script type="text/javascript" src="<?=BASE_URL?>/js/admin-relations.js"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" />
<style type="text/css">
    #relnetwork {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -5;
        background: #dddddd;
    }
    #hbar {
        padding: 16px;
        background: white;
        border-bottom: 1px solid #cccccc;
    }
    #sres {
        padding: 16px;
        background: #f9f9f9;
        border-bottom: 1px solid #cccccc;
        display: none;
    }
    #sres .card {
        margin: 4px;
    }

    #uinfo {
        padding: 16px;
        background: #f0f0f0;
        border-bottom: 1px solid #cccccc;
        display: none;
    }

    #profile-card {
        margin-top: 16px;
    }
</style>
<div id="hbar">
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <h4 style="margin: 0;">Peta Relasi</h4>
            </div>
            <div class="col-md-2">
                <div class="btn-group btn-block" id="btn-group-grouping">
                    <button class="btn btn-block btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        None
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" data-grouping="">None</a>
                        <a class="dropdown-item" data-grouping="nim">NIM</a>
                        <a class="dropdown-item" data-grouping="entityId">Role</a>
                        <a class="dropdown-item" data-grouping="in_training">In-training status</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" id="sq">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-sm btn-secondary" id="btn-search">Cari</button>
                        <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" id="btn-showall">Perlihatkan Semua</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="sres">
    <div class="container" id="search-res">
    </div>
</div>
<div id="uinfo">
    <div class="container">
        <div id="uinfo-loading">Loading..</div>
        <div id="uinfo-error"></div>
        <a id="uinfo-spoiler" data-toggle="collapse" href="#profile-card" aria-controls="profile-card" aria-expanded="false"><span>Muhammad Aditya Hilmy</span>&nbsp;&nbsp;<i class="fas fa-chevron-down"></i></a>
        <div class="card collapse" id="profile-card">
            <div class="card-body">
                <h5 class="card-title" id="uinfo-name"></h5>
                <h6 class="card-subtitle mb-2 text-muted" id="uinfo-regno"></h6>
                <div style="height: 8px"></div>
                <small><b class="text-secondary">PROFIL SINGKAT</b></small>
                <p class="card-text" id="uinfo-aboutme"></p>
                <small><b class="text-secondary">INTERESTS</b></small>
                <p class="card-text" id="uinfo-interests"></p>
                <a href="#" class="card-link" id="uinfo-vprofile-a">Lihat profil <i class="fas fa-external-link-alt"></i></a>
            </div>
        </div>
    </div>
</div>
<div id="relnetwork"></div>