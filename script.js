$(document).ready(function(){
    let ms;
    $("#hit").click(function() {
        ms.hit();
        render(ms);
    });
    $("#miss").click(function() {
        ms.miss();
        render(ms);
    });
    $("#undo").click(function() {
        ms.undo();
        render(ms);
    });
    $("#start").click(function() {
        let target = $("#targetInit").val();
        ms = new MyScr(target);
        $(".init").css('display', 'none');
        $(".game").css('display', 'flex');
        render(ms);
    });
    $("#reset").click(function() {
        $(".init").css('display', 'flex');
        $(".game").css('display', 'none');
    });
});

function render(ms) {
    $("#target").html(ms.target);
    $("#hits").html(ms.hits);
    $("#misses").html(ms.misses);
    $("#atempts").html(ms.atempts);
    $("#left").html(ms.left);
    $("#currentPercentage").html(ms.currentPercentage + "%");
    $("#minPercentage").html(ms.minPercentage + "%");
    $("#maxPercentage").html(ms.maxPercentage + "%");
    $("#score").html(`${ms.hits} / ${ms.atempts}`);
    $("#results").html(
        `<table class="table table-bordered">
            ${
                ms.data.map((item, index) => {
                    return `<tr><td>${index+1}</td><td>${item}</td></tr>`;
                }).join('')
            }
        </table>`
    );
}

class MyScr {

    constructor(target = 100) {
        this.data = [];
        this.target = target;
        this.atempts = 0;
        this.hits = 0;
        this.misses = 0;
        this.left = 0;
        this.currentPercentage = 0;
        this.minPercentage = 0;
        this.maxPercentage = 0;
    }

    hit() {
        if(this.data.length < this.target) {
            this.data.push(1);
            this.recalculate();
        }
    }

    miss() {
        if(this.data.length < this.target) {
            this.data.push(0);
            this.recalculate();
        }
    }

    undo() {
        if(this.data.length > 0) {
            this.data.pop();
            this.recalculate();
        }
    }

    recalculate() {
        this.atempts = this.data.length;
        this.left = this.target - this.atempts;
        this.hits = this.data.reduce(function(a, b){
            return a + b;
        }, 0);
        this.misses = this.atempts - this.hits;
        this.currentPercentage = this.atempts > 0 ? ((this.hits / this.atempts)*100).toFixed(2) : 0;
        this.minPercentage = ((this.hits / this.target)*100).toFixed(2);
        this.maxPercentage = (((this.hits + this.left) / this.target)*100).toFixed(2);
    }

}