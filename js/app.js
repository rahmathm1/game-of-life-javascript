		var RAW_SIZE = 5,COLOUM_SIZE = 5,COUNT_THREE = 3,COUNT_TWO = 2,LIVE = 1,DEAD = 0;
		var app = {
			/* Variable Declarations */
			do: function() {			
				var matrix = this.getMatrix();
				this.nextState(matrix);
			},

			getMatrix: function() {
				var matrix = [];
				var inputs = $('.inputs');
				var k = 0 ;
				for( var i=0 ; i<RAW_SIZE ; i++ ) {
					matrix.push([]);
					for( var j=0 ; j<COLOUM_SIZE ; j++ ) {
						matrix[i].push($(inputs[k]).text());
						k++;
					}
				}
				return matrix;
			},
			putMatrix: function(matrix) {
				var inputs = $('.inputs');
				var k = 0 ;
				for( var i=0 ; i<RAW_SIZE ; i++ ) {
					for( var j=0 ; j<COLOUM_SIZE ; j++ ) {
						$(inputs[k]).text(matrix[i][j]);
						k++;
					}
				}
				return matrix;
			},
			/* function definitions */
			updateState: function(liveCount,currentCell) {
				var newStatus = "";
				if(liveCount < COUNT_TWO)
					newStatus = DEAD;
				else if(liveCount == COUNT_THREE) 
					newStatus = LIVE;		
				else if(liveCount == COUNT_TWO) 
					newStatus = currentCell;					
				else if(liveCount > COUNT_THREE) 
					newStatus = DEAD;
				return newStatus;
			},

			printMatrix: function(matrix) {
				var SPACE = ' ';
				var NEW_LINE = '<br />'
				for( var i=0 ; i<RAW_SIZE ; i++ ) {
					for( var j=0 ; j<COLOUM_SIZE ; j++ ) {
						document.write(SPACE + matrix[i][j] );
					}
					document.write(NEW_LINE);
				}
				document.write('<hr/>' );
			},
			nextState: function(matrix) {
				var outputMatrix = this.getBlankMatrix();		
				for( var i=0 ; i<RAW_SIZE ; i++ ) {
					for( var j=0 ; j<COLOUM_SIZE ; j++ ) {
						var liveCount = this.getLiveCount(matrix,i,j);									
						outputMatrix[i][j] = this.updateState(liveCount,matrix[i][j]);	
					}	
				}
				this.putMatrix(outputMatrix);
			},
			getLiveCount: function(matrix,i,j) {
				var count = 0;
				for(var x=-1;x<2;x++) {
					for(var y=-1;y<2;y++) {
						var a = i+x;
						var b = j+y;
						if( ! ( i==a && j == b ) ){
							if( a>=0 && a <RAW_SIZE     &&   b >=0 && b<COLOUM_SIZE) {
								if(matrix[a][b] == 1) {
									count++;
								}
							}
						}
					}
				}	
				return count;		
			},
			getBlankMatrix: function() {
				var matrix = [];
				matrix.push([0,0,0,0,0]);
				matrix.push([0,0,0,0,0]);
				matrix.push([0,0,0,0,0]);
				matrix.push([0,0,0,0,0]);		
				matrix.push([0,0,0,0,0]);
				return matrix;
			}
		}