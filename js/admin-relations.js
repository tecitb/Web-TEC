var nmap;
var nodes;
var edmap;
var edges;
var nodeInfo;

var network;
var groupby = "";

const INTEREST = ["Tech|tech", "F&B|fnb", "Fashion|fashion", "Arts & Design|artsndesign", "Books & Magz|booksnmagz", "Financial|financial", "Travel|travel", "Hospitality|hospitality", "Entertainment|entertainment"];

function loadAllRelations() {
    loadRelations('all');
}

function loadRelations(regno) {
    console.log("loading relations");
    $.ajax({
        method: "GET",
        data: {'grouping' : groupby},
        url: SERVER_URL + "/api/relations/network/" + regno,
        headers: {"Authorization": "Bearer " + Cookies.get("token")}
    }).done(function (msg) {
        msg.nodes.forEach(function(currentValue, index, arr) {
            if(nmap[currentValue.id] === undefined) {
                nmap[currentValue.id] = true;
                nodes.add(currentValue);
            }
        });

        msg.edges.forEach(function(currentValue, index, arr) {
            if(edmap[currentValue.from + "-" + currentValue.to] === undefined) {
                edmap[currentValue.from + "-" + currentValue.to] = true;
                edges.add(currentValue);
            }
        });

        msg.node_info.forEach(function(currentValue, index, arr) {
            nodeInfo[currentValue.entity_id] = currentValue;
        });
    }).fail(function() {
        alert("Load network failed, please try again");
    });
}

function searchUser() {
    let query = $("#sq").val();
    $.ajax({
        method: "GET",
        url: SERVER_URL + "/api/user/search/" + encodeURIComponent(query),
        headers: {"Authorization": "Bearer " + Cookies.get("token")}
    }).done(function (msg) {
        console.log("done E= " + msg);

        $("#sres").slideDown(0);
        $("#search-res").html('');
        msg.forEach(function(currentValue, index, arr) {
            if(currentValue.tec_regno != "") {
                ct = '<div class="card d-md-inline-flex p-2"> <div> <b>' + currentValue.name + '</b> <span class="text-secondary">' + currentValue.tec_regno + '</span> &nbsp; <button type="button" class="btn btn-secondary btn-sm btn-extract" data-regno="' + currentValue.tec_regno + '"><i class="fas fa-external-link-alt"></i></button> </div> </div>';
                $("#search-res").append(ct);
            }
        });

        $(".btn-extract").on('click', function() {
            if(network !== null) {
                network.destroy();
                network = null;
            }
            loadNetwork();

            let regno = $(this).attr("data-regno");
            $("#sres").slideUp(0);
            loadRelations(regno);
        });
    }).fail(function() {
        alert("Load results failed, please try again");
    });
}

function loadNetwork() {
    nmap = [];
    nodes = new vis.DataSet([]);
    edmap = [];
    edges = new vis.DataSet([]);
    nodeInfo = [];

    // create a network
    var container = document.getElementById('relnetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 16,
                color: '#000000'
            },
            borderWidth: 2
        },
        edges: {
            width: 1
        }
    };

    // initialize your network!
    network = new vis.Network(container, data, options);

    network.on("click", function(params) {
        if(params['nodes'].length === 1) {
            loadRelations(params['nodes'][0]);
            loadEntityDetails(params['nodes'][0]);
        }
    });
}

function loadEntityDetails(tecRegNo) {
    $("#uinfo").slideDown(0);
    $("#profile-card").collapse('hide');
    $("#uinfo-spoiler").fadeOut(0);
    $("#uinfo-error").fadeOut(0);
    $("#uinfo-loading").fadeIn(0);
    $.ajax({
        method: "GET",
        url: SERVER_URL + "/api/user/regno/" + encodeURIComponent(tecRegNo),
        headers: {"Authorization": "Bearer " + Cookies.get("token")}
    }).done(function (msg) {
        $("#uinfo-loading").fadeOut(0);
        $("#profile-card").collapse('hide');
        if(msg === false) {
            $("#uinfo-spoiler").fadeOut(0);
            if(nodeInfo[tecRegNo] == undefined) $("#uinfo-error").fadeIn(0).text("No data");
            else $("#uinfo-error").fadeIn(0).text(nodeInfo[tecRegNo]['dn']);
        } else {
            console.log("done E= " + msg);
            $("#uinfo-spoiler").fadeIn(0);
            $("#uinfo-spoiler span").text(msg.name);
            $("#uinfo-error").fadeOut(0);
            $("#uinfo-name").text(msg.name);
            $("#uinfo-regno").text(msg.tec_regno + " / NIM " + msg.NIM);
            $("#uinfo-aboutme").text(msg.about_me);
            $("#uinfo-vprofile-a").attr("href", BASE_URL + "/admin/user/" + msg.id);

            var usrInterests = msg.interests.split(",");
            var uintrp = [];

            // Display interests
            for(k = 0; k < usrInterests.length; k++) {
                for (var i = 0; i < INTEREST.length; i++) {
                    var its = INTEREST[i].split("|");
                    if (its[1] === usrInterests[k]) {
                        uintrp.push(its[0]);
                        break;
                    }
                }
            }

            $("#uinfo-interests").text(uintrp.join(", "));
        }
    }).fail(function() {
        $("#profile-card").collapse('hide');
        $("#uinfo-spoiler").fadeOut(0);
        $("#uinfo-loading").fadeOut(0);
        $("#uinfo-error").fadeIn(0).text("Gagal memuat data");
    });
}

$(document).ready(function() {
    loadNetwork();
    $("#btn-search").on('click', function() {
        searchUser();
    });
    $("#btn-showall").on('click', function() {
        if(network !== null) {
            network.destroy();
            network = null;
        }
        loadNetwork();

        $("#sres").slideUp(200);
        loadAllRelations();
    });
    $("#btn-group-grouping .dropdown-item").on('click', function() {
        $("#btn-group-grouping .btn").text($(this).text());
        groupby = $(this).attr("data-grouping");
        loadNetwork();
    });
});
