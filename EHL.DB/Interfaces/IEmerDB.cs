using EHL.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.DB.Interfaces
{
	public interface IEmerDB
	{
		public List<EmerModel> GetAllEmer();
		public bool AddEmer(EmerModel emer);
		public bool UpdateEmer(EmerModel emer);
		public bool DeactivateEmer(long Id);
		public long AddFile(Documents document);
	}
}
