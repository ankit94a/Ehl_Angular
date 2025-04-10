﻿using EHL.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.DB.Interfaces
{
	public interface IEmerDB
	{
		public List<EmerModel> GetAllEmer(long wingId);
		public bool AddEmer(EmerModel emer);
		public bool UpdateEmer(EmerModel emer);
		public bool DeactivateEmer(long Id);
		public long AddFile(Documents document);
		public List<EmerModel> GetAllMasterSheet();
		public List<EmerModel> GetLatestEmer();
		public List<EmerIndex> GetEmerIndex(int wingId);

	}
}
